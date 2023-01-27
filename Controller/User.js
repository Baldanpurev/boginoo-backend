const express = require("express");
const Data = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
exports.getUsers = async (req, res) => {
  try {
    const user = await Data.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Data.findOne({ email });

    if (user) {
      res.status(400).json({ message: "user exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Data.create({
      email: email,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getUserByEmail = async (req, res) => {
  const user = await Data.findOne({
    email: req.params.id,
  });

  res.status(200).just(user);
};

const ACCESS_TOKEN_KEY = "secret123";

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Data.findOne({ email: email });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "password is dont match" });
    }
    const token = jwt.sign(
      {
        user: user.email,
      },
      ACCESS_TOKEN_KEY
    );

    res.status(200).json({ match: match, user: user });
  } catch (error) {
    res.status(400).json({ message: "password is dont match" });
  }
};
exports.updateUserPass = async (req, res, next) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await Data.findOneAndUpdate(
    { email: email },
    { password: hashedPassword },
    {
      runValidators: true,
    }
  );

  res.status(200).json(updatedUser);
};
