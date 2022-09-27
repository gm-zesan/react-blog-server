const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");

// user registration
exports.saveUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

//user login
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(400).json("Wrong user!");
            return;
        }

        const validated = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validated) {
            res.status(400).json("Wrong user!");
            return;
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
};

//user get
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
};

//user update
exports.updateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            console.log("Server-Error");
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
};

//user delete
exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete({ _id: req.params.id });
                res.status(200).json("user has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            console.log("Server-Error");
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
};
