const ImagetoText = require("../model/ImageModel");
const { uploadImageToCloud, formatImage } = require("../utils/helper");

exports.helper = async (req, res) => {
  const { file } = req;
  const { isVerified, userId,title} = req.body;
  console.log(userId);
  const checker = await ImagetoText.find({userId:userId})
  if (checker.length>0) {
    console.log("s");
    try { 
      if (file) {
        const f = await uploadImageToCloud(file);
        const poster = formatImage(f)
         console.log(poster);
         const a = {
           image: poster,
           isVerified,
           title
         }
        const result = await ImagetoText.updateOne(
        { userId: userId }, // Filter based on userId
        { $push: { image: a } } // Use $push to add 'img' to the 'image' array
      );
      //    if (result.nModified > 0) {
      //   console.log('Image pushed into the array successfully');
      // } else {
      //   console.log('No documents were updated.');
      // }
        res.json({ checker })
      }
    }
    catch (err) {
      // console.log(err)
        //  res.json(err)
    }
  } else {
     try { 
       if (file) {
           const f = await uploadImageToCloud(file);
         const response = new ImagetoText({ userId });
         const poster = formatImage(f)
         console.log(poster);
         const a = {
           image: poster,
           isVerified,
           title
         }
        //  console.log(response);
         response.image = a;
         console.log(response)
         await response.save();
        res.json({ response })
      }
    }
    catch (err) {
       console.log(err)
     }
  }
  // console.log(response);
    // await response.save();
    // console.log(response);
    // res.json({ response });
}

// exports.helper = async (req, res) => {
//   const { file } = req;
//     const { isVerified, userId } = req.body;

//   const poster = formatImage(file);
//   const a = {
//     image: poster,
//     isVerified
//   }
//   console.log(a);
//   res.json({"message":"yes"})
// }