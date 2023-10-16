const express = require('express')
const router = express.Router();
const { uploadVideo, uploadImage } = require("../middleware/multer");
const {helper} = require('./helper.js')
router.post('/',
    uploadImage.single('image'),  
    helper
)

module.exports = router;