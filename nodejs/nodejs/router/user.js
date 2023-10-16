const express=require('express');
const { userValidator, validate, signInValidator } = require('../middleware/validator');
const { CreateUser, signIn, GetAllData } = require('../controllers/user');
const router = express.Router();

router.post('/create',
    // userValidator,
    // validate,
    CreateUser)
router.post("/sign-In", signInValidator, validate, signIn);
router.get('/getImage',GetAllData)

module.exports = router;