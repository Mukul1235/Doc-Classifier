const ImagetoText = require("../model/ImageModel");
const UserSchema = require("../model/user");
const { sendError } = require("../utils/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.CreateUser = async (req, res) => {
  try{
  // console.log(req);
      const { name, email, password } = req.body;
      const oldUser = await UserSchema.findOne({ email });
      // console.log(req.body);
      // console.log(oldUser);
    if (oldUser) return res.json({success:false,error:"Sorry a user with this email already exixts."})
    const newUser = new UserSchema({ name, email, password });
    await newUser.save();
    // console.log(newUser)
    
    res.status(201).json({
    user: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  },
  success:true
});}
catch(error){
  console.log(error.message)
  res.json({success:false,error:"Some Error Occured"})
}
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  try{
    const user = await UserSchema.findOne({ email: email });
    if (!user) return res.json({success:false,error:"Please try to login with correct credentials"})

        const matched = await user.comparePassword(password);
      // const matched = await bcrypt.compare(password, user.password);
      console.log(matched)
    if (!matched) return res.json({success:false,error:"Please try to login with correct credentials"})

    const { _id, name, role } = user;
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    }); // 7 hr

    res.json({
      user: { id: _id, name, role, email, token: jwtToken, },
      success:true
    });}
  catch(error){
    console.log(error.message)
    res.status(500).send("Internal Server Error Ocuured")
  }
};

exports.GetAllData = async (req, res) => {
  const { userId } = req.query;
  // console.log(req.query)
  // userId=JSON.parse(userId)
  console.log(userId)
  try {
    console.log(userId)
  const data = await ImagetoText.find({ userId })
  console.log(data);
  res.json({ data });
  } catch (err) {
    // console.log(error)
  }

}