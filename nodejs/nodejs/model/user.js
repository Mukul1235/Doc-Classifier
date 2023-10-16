const mongoose = require("mongoose");
const bcrypt=require("bcrypt");


const UserModel = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // use to Remove White Spaces
      // require: true,
    },
   email: {
    type: String,
    trim: true, // use to Remove White Spaces
    // require: true,
    // unique: true,
    },
     password: {
    type: String,
    // require: true,
  },
      role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  },
  { timestamps: true }
);

UserModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserModel.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};
const UserSchema = mongoose.model("User", UserModel);

module.exports = UserSchema;

