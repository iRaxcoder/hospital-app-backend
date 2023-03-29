/* 
   BASE ROUTE: '/api/uploads
*/

const expressFileUpload = require("express-fileupload");

const { Router } = require("express");
const { fileUpload } = require("../controllers/uploads");
const { validateJWT } = require("../middlewares/jwt-validation");

const router = Router();

router.use(expressFileUpload());

//routes
router.put("/:type/:id", validateJWT, fileUpload);

module.exports = router;
