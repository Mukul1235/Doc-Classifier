// const multer = require("multer");
// const path=require("path");
// const storage = multer.diskStorage({    destination: function (req, file, cb) {
//         return cb(null,"uploads")
//     },
//     filename: function(req, file, cb) {
//         return cb(null,`${Date.now()}-${file.originalname}`)
//     }});

// const fileFilterImage = (req, file, cb) => {
//   //cb=>callback
//   console.log(file);
//   if (!file.mimetype.startsWith("image")) {
//     cb("Supported only image files", false);
//   }
//   cb(null, true); // cb(error,to proceed or not{boolean})
// };
// const fileFilterVideo = (req, file, cb) => {
//   if (!file.mimetype.startsWith("video")) {
//     cb("Supported only image files", false);
//   }
//   cb(null, true); // cb(error,to proceed or not{boolean})
// };
// exports.uploadImage = multer({ storage, fileFilter:fileFilterImage });
// exports.uploadVideo = multer({ storage, fileFilter:fileFilterVideo });
const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilterImage = (req, file, cb) => {

  //cb=>callback
  console.log(file);
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files", false);
  }
  cb(null, true); // cb(error,to proceed or not{boolean})
};
const fileFilterVideo = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("Supported only image files", false);
  }
  cb(null, true); // cb(error,to proceed or not{boolean})
};
exports.uploadImage = multer({ storage, fileFilter:fileFilterImage });
exports.uploadVideo = multer({ storage, fileFilter:fileFilterVideo });
