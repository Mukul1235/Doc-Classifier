const mongoose = require("mongoose");
const bcrypt=require("bcrypt");


const ImageModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    // required: true,
   },
    image: [
      {
        image:{   type: Object,
      url: { type: String, required: true },
          public_id: { type: String, required: true }
        },
        isVerified: { type: Boolean, default: false },
        title:String
      }
    ],
  },
  { timestamps: true }
);

// ImageModel.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// ImageModel.methods.comparePassword = async function (password) {
//   const result = await bcrypt.compare(password, this.password);
//   return result;
// };
const ImagetoText = mongoose.model("ImagetoText", ImageModel);

module.exports = ImagetoText;

