const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sensor = require("../models/sensor");
const User = require("../models/user");
const { getSensorData } = require("../mqtt/consumer");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/sendData", async (req, res) => {
  try {
    const sensorData = getSensorData();
    if (sensorData) {
      const newSensor = new Sensor(sensorData);
      const addSensor = await newSensor.save();
      res.json({
        pesan: "Data Berhasil di Request",
        data: addSensor,
      });
    } else {
      res.status(400).json({ message: "No sensor data available" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
router.post("/addUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check existing user
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({ username, password });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password incorrect !!!" });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({
        message: "Login Berhasil !!!",
        token,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
