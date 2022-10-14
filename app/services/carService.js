const carRepository = require("../repositories/carsRepository");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgmknbm2h",
  api_key: "747897534543522",
  api_secret: "O3M3qaUmj4iV4mZreBDhzoOHRb4",
  secure: true,
});

function upload(img) {
  const fileBase64 = img.buffer.toString("base64");
  const file = `data:${file.mimetype};base64,${fileBase64}`;
  cloudinary.uploader
    .upload(file)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

const sizeMap = {
  small: 1,
  medium: 2,
  large: 3,
};

const parseBody = (requestBody) => {
  return {
    image: requestBody.photo.secure_url,
    rentPerDay: parseInt(requestBody.rentPerDay),
    name: requestBody.name,
    sizeId: sizeMap[requestBody.size.toLowerCase()],
  };
};

module.exports = {
  create(requestBody, image) {
    requestBody.photo = upload(image);
    return carRepository.create(parseBody(requestBody));
  },

  update(carId, requestBody, image) {
    requestBody.photo = upload(image);
    return carRepository.update(carId, parseBody(requestBody));
  },

  get() {
    return carRepository.findAll();
  },

  getById(carId) {
    return carRepository.findById(carId);
  },

  delete(carId) {
    return carRepository.delete(carId);
  },
};
