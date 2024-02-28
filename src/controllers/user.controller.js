import bcrypt from "bcrypt";
import User from "../database/models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Handle user signup
export const signUp = async (req, res) => {
  const { name, email, password, dateOfBirth, role } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      dateOfBirth: new Date(dateOfBirth),
      role: role || "normal", // Default to 'normal' if role is not provided
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ Error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token });
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};

export default { signUp };
