const ImagetoText = require("../model/ImageModel");
const UserSchema = require("../model/user");
const { formatUser, formatImage } = require("../utils/helper");




exports.AllUsers = async (req, res) => {
    try {
          const user = await UserSchema.find({})
        .sort({ createdAt: -1 })
    const profiles=user.map((user)=>formatUser(user))
    res.json({ profiles });
    } catch (error) {
        res.send(error)
    }
  
}

exports.getAllImage = async (req, res) => {
    try {
            const { userId } = req.query;
    console.log(userId)
    const images = await ImagetoText.find({ userId })
    // const profiles=
    res.json({ images });
    } catch (error) {
        res.send(error)
    }

}

// url, public_id, isVerified,
exports.ChangeVerfication = async (req, res) => {
    const { userId, image } = req.body;
    // console.log(userId)
    try {
        const newUser = await ImagetoText.deleteOne({ userId });
        const model = new ImagetoText({ userId });
        console.log(model)
        model.image = image;
        
        console.log(model)
        await model.save();
        // await newUser.save();
        res.json({ model });
        
    }
    catch (err) {
        res.send(err)
    }
}