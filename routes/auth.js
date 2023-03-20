/* 
   BASE ROUTE: '/api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, renewUserToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/jwt-validation");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.post("/renew-user-token", [validateJWT], renewUserToken);

module.exports = router;
