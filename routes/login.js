const { Router } = require("express");
const login = require("../controllers/login");
const {validateLogin} = require("../middleware/validator");

const router = Router();

router.post("/", validateLogin, function(req, res) {
    login(req, res);
});


module.exports = router;
