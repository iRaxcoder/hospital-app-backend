const { response, request } = require("express");
const Doctor = require("../models/Doctor");

const getDoctors = async (req = request, res = response) => {
  return res.send(
    await Doctor.find()
      .populate("user", "name img")
      .populate("hospital", "name img")
  );
};

const createDoctor = async (req, res = response) => {
  const uid = req.uid;
  try {
    const doctor = new Doctor({
      user: uid,
      ...req.body,
    });

    const createdDoctor = await doctor.save();
    res.send({
      ok: false,
      createdHospital: createdDoctor,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ ok: false, msg: "Error. Please contact the administrator" });
  }
};

const updateDoctor = async (req, res = response) => {
  try {
    res.send({
      ok: false,
      msg: "UpdateDoctor",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Unexpected error. Please contact the administrator",
    });
  }
};

const deleteDoctor = async (req, res = response) => {
  try {
    res.send({
      ok: false,
      msg: "DeleteDoctor",
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
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
