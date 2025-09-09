const nodemailer = require("nodemailer");
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

// ✅ Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// ✅ Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Signup
const signup = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth } = req.body;
  try {
    if (!req.file) {
      return res.status(401).json({ message: "Please upload an image" });
    }
    const image = req.file.path;



    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth,
      image,
    });

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Welcome to Arbaz WebCraft!",
      text: `Dear ${firstName},\n\nThank you for creating an account with Arbaz WebCraft. We're excited to have you on board!\n\nRegards,\nThe Arbaz WebCraft Team`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Error sending email:", error);
      }
    });

    res.status(201).json({ message: "Successfully signed up", user });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not found, please sign up" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3333d" }
    );

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Welcome back to Arbaz WebCraft!",
      text: `Dear ${user.firstName},\n\nYou have successfully logged in to your Arbaz WebCraft account. Welcome back!\n\nIf this was not you, please contact our support team immediately.\n\nRegards,\nThe Arbaz WebCraft Team`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Error sending email:", error);
      }
    });

    res.status(200).json({
      message: "Successfully logged in",
      user,
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Verify Token (No cookies, token from headers)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("❌ Token expired:", err.expiredAt);
      return res.status(401).json({ message: "Token expired. Please login again." });
    } else if (err.name === "JsonWebTokenError") {
      console.error("❌ Invalid token:", err.message);
      return res.status(401).json({ message: "Invalid token. Please login again." });
    } else {
      console.error("❌ Token verification error:", err);
      return res.status(401).json({ message: "Unauthorized: Token verification failed." });
    }
  }
};


// ✅ Update User Role
const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const roleMessage =
      newRole === "admin" ? "You are now an admin." : "You are now a user.";

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: user.email,
      subject: "Role Update Notification",
      text: `Dear ${user.firstName},\n\nYour role has been updated. ${roleMessage}\n\nRegards,\nThe Arbaz WebCraft Team`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Error sending email:", error);
      }
    });

    res.status(200).json({ message: "User role updated", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Single User Info
const getUserInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error in getAllUsers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Logout (Only handled frontend)
const logout = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: user.email,
      subject: "Logout Notification",
      text: `Dear ${user.firstName},\n\nYou have successfully logged out from your Arbaz WebCraft account.\n\nRegards,\nThe Arbaz WebCraft Team`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Error sending email:", error);
      }
    });

    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ message: "Server error" });
  }
};





// ✅ Forgot Password - Send Verification Code
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate 6-digit random code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Save code and expiry (10 min) in user document
    user.resetCode = verificationCode;
    user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send code to user's email
    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your verification code for password reset is: ${verificationCode}\n\nThis code will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending reset code email:", error);
        return res.status(500).json({ message: "Failed to send email" });
      }
    });

    res.status(200).json({ message: "Verification code sent to email" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Reset Password
const resetPassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.resetCode || !user.resetCodeExpiry) {
      return res.status(400).json({ message: "No reset request found" });
    }

  if (String(user.resetCode) !== String(verificationCode)) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (Date.now() > user.resetCodeExpiry) {
      user.resetCode = undefined;
      user.resetCodeExpiry = undefined;
      await user.save();
      return res.status(400).json({ message: "Verification code expired" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Verify Reset Code
// ✅ Verify Reset Code
const verifyCode = async (req, res) => {
  const { email, resetCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.resetCode || !user.resetCodeExpiry) {
      console.log("❌ No reset request found for email:", email);
      return res.status(400).json({ message: "No reset request found" });
    }

    if (String(user.resetCode) !== String(resetCode)) {
      console.log(`❌ Invalid code: sent ${resetCode}, expected ${user.resetCode}`);
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (Date.now() > user.resetCodeExpiry) {
      user.resetCode = undefined;
      user.resetCodeExpiry = undefined;
      await user.save();
      console.log("❌ Code expired");
      return res.status(400).json({ message: "Verification code expired" });
    }

    console.log("✅ Verification successful for email:", email);
    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error in verifyCode:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



// ✅ Update Profile
const updateProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    // If a new image is uploaded, replace the old one
    if (req.file) {
      user.image = req.file.path;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("Error in updateProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {
  signup,
  login,
  updateUserRole,
  verifyToken,
  getUserInfo,
  getAllUsers,
  logout,
  upload,
  
  forgotPassword,
  resetPassword,
  verifyCode,

  updateProfile
};
