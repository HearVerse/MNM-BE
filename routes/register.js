const { Router } = require("express");
const register = require("../controllers/register");
const {createUserSchema} = require("../middleware/validator");

const router = Router();

router.post("/", createUserSchema, function(req, res) {
    register(req, res)
});

module.exports = router;
