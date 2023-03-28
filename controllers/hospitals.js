const { response, request } = require("express");
const Hospital = require("../models/Hospital");

const getHospitals = async (req = request, res = response) => {
  return res.send(await Hospital.find().populate("createdBy", "name img"));
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  try {
    const hospital = new Hospital({
      createdBy: uid,
      ...req.body,
    });

    const createdHospital = await hospital.save();
    res.send({
      ok: false,
      createdHospital,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ ok: false, msg: "Error. Please contact the administrator" });
  }
};

const updateHospital = async (req, res = response) => {
  try {
    res.send({
      ok: false,
      msg: "UpdateHospital",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Unexpected error. Please contact the administrator",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  try {
    res.send({
      ok: false,
      msg: "DeleteHospital",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Unexpected error. Please contact the administrator",
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
