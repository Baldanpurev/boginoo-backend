const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./Router/Router");
const usersRouter = require("./Router/user");
const connection = mongoose.connection;

const app = express();
const PORT = 8000;
const URI =
  "mongodb+srv://Golden9u:Hairtai11@cluster0.hwe8vz2.mongodb.net/Practice?retryWrites=true&w=majority";
mongoose.connect(URI);

app.use(express.json());
app.use(cors());
app.use("/link", Router);
app.use("/user", usersRouter);

connection.once("open", () => {
  console.log("connect MONGODB server");
});

app.listen(PORT, () => {
  console.log(PORT, "listening on port");
});
