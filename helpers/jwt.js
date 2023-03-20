const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "30h",
      },
      (err, token) => {
        if (err) reject("Error. Token was not generated");
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
