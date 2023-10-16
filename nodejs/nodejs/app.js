const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./db/index");

const cors = require('cors')
const demo = require('./router/demo.js')
const userRouter = require('./router/user.js')
const adminRouter=require('./router/admin.js')
const morgan = require('morgan')
const colors = require('colors')
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use('/demo', demo);
app.use('/user',userRouter)
app.use('/admin', adminRouter);
app.listen(6000, () => {
    console.log('6000 is port'.blue)
})