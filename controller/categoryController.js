const Category = require("../models/Category");

// create post
exports.saveCat = async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
};

//all category get
exports.getAllCats = async (req, res) => {
    try {
        const posts = await Category.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};
