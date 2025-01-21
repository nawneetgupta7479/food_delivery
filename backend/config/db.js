import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error connecting to DB:", err);
  }
};
