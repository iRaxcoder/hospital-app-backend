const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res
      .status(401)
      .send({ ok: false, msg: "Unauthorized access (token is needed)" });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;

    next();
  } catch (error) {
    console.log(error);
    res.status(502).send({ ok: false, msg: "Token is not valid", token: null });
  }
};

module.exports = {
  validateJWT,
};
