const express = require("express");
const { updateUser, deleteUser, getUser } = require("../controller/userController");
const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

    

module.exports = router;
