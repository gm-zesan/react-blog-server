const Post = require("../models/Post");

// create post
exports.savePost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

// update post
exports.updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your post");
    }
};

// delete post
exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
        try {
            await Post.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json("post has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can delete only your post");
    }
};

//post get
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

//all post get
exports.getAllPosts = async (req, res) => {
    const user = req.query.user;
    const cat = req.query.cat;
    try {
        let posts;
        if (user) {
            posts = await Post.find({ username: user });
        } else if (cat) {
            posts = await Post.find({ categories: { $in: [cat] } });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};
