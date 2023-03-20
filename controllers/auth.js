const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "User does not exist",
      });
    }

    //password confirmation

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        ok: false,
        msg: "Wrong password",
      });
    }

    //JWT generation
    const token = await generateJWT(user.id, user.name);

    res.send({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ ok: false, msg: "Error. Please contact the administrator" });
  }
};

const renewUserToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);
  res.status(200).send({ ok: true, uid, name, token });
};

module.exports = {
  loginUser,
  renewUserToken,
};
