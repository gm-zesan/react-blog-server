const express = require("express");
const { saveCat, getAllCats } = require("../controller/categoryController");

const router = express.Router();

router.post("/create", saveCat);
router.get("/", getAllCats);

module.exports = router;
