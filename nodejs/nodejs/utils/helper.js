const cloudinary = require("../cloud/index");

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};
exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {

      height: 500,
      width: 500,
      // crop: "thumb",
    }
  );
  return { url, public_id };
};
exports.formatUser = (actor) => {
  const { name, _id, email,role } = actor;
  return {
    id: _id,
    name,
    email,
    role
  };
};

exports.parseData = (req, res, next) => {

  const { userId,image } = req.body;
console.log(userId)
console.log(image)
  if (userId) req.body.userId = JSON.parse(userId);
  if (image) req.body.image = JSON.parse(image);

  next();
};
exports.formatImage = (file) => {
  const { url, public_id } = file;

  return {
    url,
    public_id
  }
}