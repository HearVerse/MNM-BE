const { Router } = require("express");
const userController = require('../controllers/user');
const { uploadMulti } = require("../middleware/validator")
const router = Router();

router.get("/:id", userController.getUserById);
router.post("/update", uploadMulti, userController.updateUser);

module.exports = router;
