const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const User = require("../models/User");

const getUsers = async (req = request, res = response) => {
  return res.send(await User.find({}));
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        ok: false,
        msg: "User already exists",
      });
    }
    user = new User(req.body);

    //password encryptation

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //JWT generation
    const token = await generateJWT(user.id, user.name);

    res.status(201).send({ ok: true, uid: user._id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ ok: false, msg: "Error. Please contact the administrator" });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    let user = await User.findById(uid);
    if (!user) {
      return res.status(404).send({
        ok: false,
        msg: "User does not exists",
      });
    }

    const { password, google, email, ...fields } = req.body;

    if (user.email != email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).send({
          ok: false,
          msg: "Error. Email is already in use. Try another email.",
        });
      }
    }

    fields.email = email;

    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.status(201).send({ ok: true, updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Unexpected error. Please contact the administrator",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    let user = await User.findById(uid);
    if (!user) {
      return res.status(404).send({
        ok: false,
        msg: "User does not exists",
      });
    }

    const removedUser = await User.findByIdAndRemove(uid, {
      new: true,
    });

    res.status(201).send({ ok: true, removedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Unexpected error. Please contact the administrator",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
