const carRepository = require("../repositories/carsRepository");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgmknbm2h",
  api_key: "747897534543522",
  api_secret: "O3M3qaUmj4iV4mZreBDhzoOHRb4",
  secure: true,
});

async function upload(img) {
  const fileBase64 = img.buffer.toString("base64");
  const file = `data:${img.mimetype};base64,${fileBase64}`;

  try {
    const imageUrl = await cloudinary.uploader.upload(file);
    return imageUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
  async create(requestBody, image, adminId) {
    requestBody.photo = await upload(image);
    console.log("req", requestBody);
    return carRepository.create({
      ...parseBody(requestBody),
      createdBy: adminId,
    });
  },

  update(carId, requestBody, image, adminId) {
    requestBody.photo = upload(image);
    return carRepository.update(carId, {
      ...parseBody(requestBody),
      updatedBy: adminId,
    });
  },

  get() {
    return carRepository.findAll();
  },

  getById(carId) {
    return carRepository.findById(carId);
  },

  delete(carId, adminId) {
    return carRepository.delete(carId, adminId);
  },
};
