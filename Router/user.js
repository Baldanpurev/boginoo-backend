const express = require("express");

const {
  createUser,
  getUsers,
  getUserByEmail,
  login,
  updateUserPass,
} = require("../controller/User.js");

const Data = require("../models/user");

const usersRouter = express.Router();

usersRouter.delete("/deleteAll", async (req, res) => {
  await Data.deleteMany();
  res.json({ success: true });
});

usersRouter.post("/createUser", createUser);
usersRouter.get("/getUsers", getUsers);
usersRouter.get("/getUserByEmail", getUserByEmail);
usersRouter.post("/login", login);
usersRouter.patch("/updateUserPass", updateUserPass);

module.exports = usersRouter;
