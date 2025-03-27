const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User({ name, email, password: hashPassword });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true, // Secure cookie
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "User registration failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid Password");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    console.log("Token Generated", token);

    res.cookie("token", token, {
      httpOnly: true, // Secure cookie
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    console.log("Loading...")
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error); // Log error
    res.status(500).json({ message: "Login failed" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

module.exports = { registerUser, login, logout };
