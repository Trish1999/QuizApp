require("dotenv").config();
const cors=require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user")
const quizRoute=require("./routes/quiz")
const app = express();

app.use(express.json());
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("DB failed to connect", error))

const CorsRules = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  optionsSuccessStatus: 200,
  cridentials:true
};
app.use(cors(CorsRules));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/quiz", quizRoute);

app.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})
