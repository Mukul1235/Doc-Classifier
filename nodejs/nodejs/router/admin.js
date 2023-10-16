const express = require('express')
const router = express.Router();
const {AllUsers, getAllImage, ChangeVerfication}=require('../controllers/admin');
const { parseData } = require('../utils/helper');
router.get('/', AllUsers)
router.get('/allimage',getAllImage)
router.patch('/Verfication',
    // parseData,
    ChangeVerfication)
module.exports = router;