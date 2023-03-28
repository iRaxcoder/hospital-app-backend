/* 
   BASE ROUTE: '/api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  createHospital,
  getHospitals,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/jwt-validation");

const router = Router();

//routes
router.get("/get", validateJWT, getHospitals);
router.post(
  "/create",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createHospital
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
  updateHospital
);

router.delete("/delete/:id", validateJWT, deleteHospital);

module.exports = router;
