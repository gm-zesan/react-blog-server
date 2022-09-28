const express = require("express");
const {
    savePost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
} = require("../controller/postController");
const router = express.Router();

router.post("/create", savePost);
router.get("/", getAllPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);

module.exports = router;
