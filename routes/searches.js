/* 
   BASE ROUTE: '/api/todo
*/

const { Router } = require("express");
const { getTodo, getTodoByCollection } = require("../controllers/searches");
const { validateJWT } = require("../middlewares/jwt-validation");

const router = Router();

//routes
router.get("/:query", validateJWT, getTodo);
router.get("/collection/:collection/:query", validateJWT, getTodoByCollection);

module.exports = router;
