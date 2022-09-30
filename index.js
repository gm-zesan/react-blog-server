const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const multer = require("multer");

//routes
const authRoutes = require("./routes/auth.js");
const userRouter = require("./routes/users.js");
const postRouter = require("./routes/posts.js");
const categoryRouter = require("./routes/categories.js");

const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB CONNCETED"))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req, res) => {
    res.send("Welcome to server");
});

app.listen(port, () => {
    console.log("Server is running", port);
});
