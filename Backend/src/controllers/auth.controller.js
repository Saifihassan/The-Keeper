const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

async function register(req, res) {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  })
  if (existingUser) {
    return res.status(400).json({ message: "Email or username already in use" });
  }

  try {
    const hashedpass = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedpass,
    });
    
    await user.populate('notes');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user:{    
        id:user._id,
        username:user.username,
        email:user.email    
        
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  const {username, email, password } = req.body;
  
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  })
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully!",
    user: {
      id: existingUser._id,      
    username: existingUser.username,
    email: existingUser.email,
    notes: existingUser.notes,
    }
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully"
  });
}

module.exports = {
  register,
  login,
  logout,
};
