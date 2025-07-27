
import mongoose from "mongoose";
// User Schema
// This schema defines the structure of the User document in MongoDB
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false // Hide password field in queries by default
                    // This means that when you query for users, the password field will not be returned
                    // Note: When querying for a user, the password field will not be included by default.
                    // Use .select('+password') to include it when needed
                    // Note: This is a security measure to prevent accidental exposure of passwords.
                    // Hides it from `find`, but not from `save`
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false // Disable __v field
  }
);

// Indexing for faster email lookup
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;


// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });
// module.exports = mongoose.model("User", userSchema);
