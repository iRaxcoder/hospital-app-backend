/* 
   BASE ROUTE: '/api/users
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, getUsers, updateUser } = require("../controllers/users");
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/jwt-validation");

const router = Router();

//routes
router.get("/get", getUsers);
router.post(
  "/create",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.put(
  "/update/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete("/delete/:id", validateJWT, updateUser);

module.exports = router;
