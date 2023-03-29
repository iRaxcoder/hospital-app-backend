const { response, request } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUpload = async (req = request, res = response) => {
  const { type, id } = req.params;

  const validTypes = ["hospitals", "doctors", "users"];

  if (!validTypes.includes(type)) {
    return res.status(400).send({
      ok: false,
      msg: "Type of collection is not valid",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  //image processing

  const file = req.files.img;

  const shortName = file.name.split(".");
  const extension = shortName[shortName.length - 1];

  const validExtension = ["png", "jpg", "jpeg", "gif"];

  if (!validExtension.includes(extension)) {
    return res.status(400).send({
      ok: false,
      msg: "File format/extension is not valid",
    });
  }

  // generate name of the file

  const fileName = `${uuidv4()}.${extension}`;

  // Path to save file

  const path = `./uploads/${type}/${fileName}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        ok: false,
        msg: "Error when saving image",
      });
    }
  });
  console.log(await updateImage(type, id, fileName));

  return res.send({
    ok: true,
    msg: "file uploaded successfully",
    fileName,
  });
};

module.exports = {
  fileUpload,
};
