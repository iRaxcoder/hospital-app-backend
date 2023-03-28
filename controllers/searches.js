const { response, request } = require("express");

const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");

const getTodo = async (req = request, res = response) => {
  const { query } = req.params;
  const regex = new RegExp(query, "i");

  const [users, hospitals, doctors] = await Promise.all([
    User.find({ name: regex }),
    Hospital.find({ name: regex }),
    Doctor.find({ name: regex }),
  ]);

  return res.send({
    users,
    hospitals,
    doctors,
  });
};

const getTodoByCollection = async (req = request, res = response) => {
  const { collection, query } = req.params;
  const regex = new RegExp(query, "i");

  const document = {
    doctors: async () => {
      return await Doctor.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img");
    },
    hospitals: async () => {
      return await Hospital.find({ name: regex }).populate(
        "createdBy",
        "name img"
      );
    },
    users: async () => {
      return await User.find({ name: regex });
    },
  };

  const results = (await document[collection]()) || "No results were found.";
  res.send({ ok: true, results });
};

module.exports = {
  getTodo,
  getTodoByCollection,
};
