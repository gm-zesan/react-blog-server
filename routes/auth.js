const express = require("express");
const { saveUser } = require("../controller/userController");
const router = express.Router();

router.post("/register", saveUser);

module.exports = router;