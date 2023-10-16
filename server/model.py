import Levenshtein
import easyocr
import os
import cv2
import numpy as np
import asyncio
import aiofiles
image_directory = 'uploads'
reader = easyocr.Reader(['en','hi'])
async def get_img(filename):
  # image_path = os.path.join(image_directory, filename)
  image_path=filename
  if filename.endswith('.jpeg') or filename.endswith('.png') or filename.endswith('.jpg'):
      try:
        async with aiofiles.open(image_path, mode='rb') as file:
          image = await file.read()
        image = cv2.imread(image_path)
        width = 800
        height = int(image.shape[0] * (width / image.shape[1]))
        resized_image = cv2.resize(image, (width, height))
        # Convert the image to grayscale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        results = reader.readtext(gray_image,detail=0)
        print(filename)
        return results        
      except Exception as e:
            print(f"Error processing {filename}: {str(e)}")
def calculate_similarity(word1, word2):
    # Calculate Levenshtein distance
    distance = Levenshtein.distance(word1, word2)

    # Calculate the maximum length of the two words
    max_length = max(len(word1), len(word2))

    # Calculate the similarity percentage
    similarity_percentage = ((max_length - distance) / max_length) * 100

    return similarity_percentage
def classify_words(word_array, target_words):
    # Tokenize the input words using space as a delimiter and convert them to lowercase
    tokens = [word.lower() for word in ' '.join(word_array).split()]

    # Check if any of the target words are in the tokenized words
    for word in target_words:
        if word.lower() in tokens:
            return True 
        for token in tokens:
            if calculate_similarity(word.lower(), token)>70:
              return True
    return False

# Example usage with multiple arrays of words and multilingual target words
async def classify_doc(filename):
    try:
        word_array = await get_img(filename)
        target_words_adhaar = ["आम", "UNIOUE", "IDENTIFICATION", "AADHAAR", 'आधार', 'आम', 'मेरी', 'मेरा']
        target_words_voter = ["ELECTION", "COMMISSION", "Voter", "निर्वाचन", "मतदाता", "elector"]
        target_words_passport = ["REPUBLLC", "गणराज्य", "जयते", "सत्यमेव"]
        target_words_driving = ["driving", "licence", "transport", "vehicle"]
        result = classify_words(word_array, target_words_adhaar)
        if result:
            return "aadhar"
        else:
            result = classify_words(word_array, target_words_voter)
            if result:
                return "voter"
            else:
                result = classify_words(word_array, target_words_passport)
                if result:
                    return "passport"
                else:
                    result = classify_words(word_array, target_words_driving)
                    if result:
                        return "Driving Licence"
                    else:
                        return "None"
    except Exception as e:
        return str(e)  # Handle exceptions and return an error message if an exception occurs
# print("Results:", classify_doc("91.jpg"))