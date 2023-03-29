const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const fs = require("fs");

const updateImage = async (type, id, fileName) => {
  switch (type) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return false;
      }
      const oldPath = `./uploads/doctors/${doctor.img}`;
      if (fs.existsSync(oldPath)) {
        //delete img
        fs.unlinkSync(oldPath);
      }

      doctor.img = fileName;
      await doctor.save();
      return true;
    case "hospitals":
      break;
    case "users":
      break;
  }
};

module.exports = {
  updateImage,
};
