import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
 
  // Get user details from request body
  const { name, email, password } = req.body;

  try {
    //console.log("Received registration data:", { name, email });
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({
        message: "User already registered",
        success: false
      });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    // console.log("Connected DB Name:", mongoose.connection.name);
    // console.log("Saving user:", newUser);
    res.status(201).send({
      message: "User registered successfully",
      success: true
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message || "Registration failed"
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required",
        success: false
      });
    }
    // Check if user exists
    // const user = await User.findOne({ email });
    // Using select to include password field for comparison
    // You must explicitly select the password field if you set select: false in your Mongoose schema for security.
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).send({
        message: "User not found",
        success: false
      });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).send({
        message: "Invalid credentials",
        success: false
      });

    // If everything is valid, return success response with user data
    // Destructure to remove password before sending user data
    // This helps exclude the password1 field from being sent in the response
    // const { password: pwd, ...safeUser } = user._doc;
   
    
    // Generate JWT token (if needed, uncomment the jwt code)
    const token = jwt.sign(
      { userId: user._id, email: user.email },// Include user ID and email in the token payload
      process.env.JWT_SECRET, // Use your JWT secret from environment variables
      {
        expiresIn: "1d" // Set token expiration time
      }
    );

    res.status(200).send({
      message: "Login successful",
      success: true,
      token: `Bearer ${token}`,// Include the token in the response (with Bearer prefix)
      // If you want to return user data without password, you can do so
      // data: safeUser
    });
    // If you don't need to return a token, just send a success message
    // Sending a simple success message
    // res.status(200).send({
    //   message: "Login successful",
    //   success: true
    // });
    // Uncomment the following line if you want to return a JSON response
    // res.status(200).json({
    //   message: "Login successful",
    //   success: true
    // });
  }
  catch (error) {
    res.status(500).json({
      message: error.message || "Login failed"
    });
  }
};

export const getProfile = async (req, res) => {
  const userId = req.user.userId; // Get user ID from token

  try {
    // Find user by ID
    const user = await User.findById(userId).select("-password");
    if (!user)
      return res.status(404).send({
        message: "User not found",
        success: false
      });

    res.status(200).send({
      message: "Profile retrieved successfully",
      success: true,
      data: user
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve profile"
    });
  }
};