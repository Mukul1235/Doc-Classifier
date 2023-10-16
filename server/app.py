from flask import Flask, request, jsonify
import os
import time
import requests
from flask_cors import CORS
from model import classify_doc
app = Flask(__name__)
CORS(app)
# Define the folder where uploaded images will be stored
def wait_for_file(filename, timeout_seconds=20, polling_interval=2):
    start_time = time.time()
    file_path = filename
    while True:
        print(file_path)
        if os.path.exists(file_path):
            return True  # File found
        if time.time() - start_time > timeout_seconds:
            return False  # Timeout reached
        time.sleep(polling_interval)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/upload-image', methods=['POST'])
async def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'})

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected image'})

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        if(wait_for_file(filename)):
            x=await classify_doc(filename)
            return jsonify({'message': 'Image uploaded successfully', 'filename': filename,'response':x})
        else :
            return jsonify({'error': 'File not reached'})
if __name__ == '__main__':
    app.run(debug=True)