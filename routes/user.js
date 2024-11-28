// import des packages
const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// import du modèle 'User'
const User = require("../models/User");

// utiliation du 'Router'
const router = express.Router();

// CREATE => POST (création d'un utilisateur)
router.post("/user/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const existingEmail = await User.findOne({ email: req.body.email });

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameters" });
    }
    if (existingEmail) {
      return res.status(409).json({ message: "Email already used" });
    }

    const userSalt = uid2(16);
    const userHash = SHA256(password + userSalt).toString(encBase64);
    const userToken = uid2(64);

    const newUser = new User({
      username: username,
      email: email,
      token: userToken,
      hash: userHash,
      salt: userSalt,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      token: newUser.token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE => POST (connexion d'un utilisateur)
router.post("/user/login", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const actualUser = await User.findOne({ email: userEmail });

    if (!actualUser) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const actualUserHash = SHA256(userPassword + actualUser.salt).toString(
      encBase64
    );

    if (actualUserHash !== actualUser.hash) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    res.status(200).json({ message: `Bienvenue ${actualUser.username}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
