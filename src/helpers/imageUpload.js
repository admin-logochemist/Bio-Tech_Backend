const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dswwhmznc',
  api_key: '556174277448713',
  api_secret: 'O0rGwtrV9dAKmzqOWxZDcusYhS0',
});

const storage = multer.diskStorage({});
const upload = multer({ storage });

module.exports = { cloudinary, upload };
