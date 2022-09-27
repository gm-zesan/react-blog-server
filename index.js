const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth.js");
const userRouter = require("./routes/users.js");

const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB CONNCETED")).catch(err=> console.log(err));


app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);


app.get("/", (req, res) => {
    res.send("Welcome to server");
});

app.listen(port, () => {
    console.log("Server is running", port);
});
