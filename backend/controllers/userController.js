import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// login user
const loginUser = async (req, res) => { 
  const { email, password } = req.body;
  try{
    if (!email || !password) {
      return res.status(422).json({ 
        success:false,
         message: "Please fill all the fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success:false,
         message: "User Doesn't exist! please sign Up." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success:false,
         message: "Wrong password!" });
    }
    
    const token = createToken(user._id);
    res.json({
      token,
      success: true,
      message: "User logged in successfully",
    });
    
  } catch(error){
    console.log(error);
    res.status(500).json({ 
      success:false,
       message: "Failed to login! Try again" });
  
  }
}

const createToken = (id) => {   
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60
  });
}

// signup user
const signupUser = async (req, res) => { 
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(422).json({ 
        success:false,
         message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(422).json({ 
        success:false,
         message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(422).json({ 
        success:false,
         message: "Password must be at least 8 characters" });
    }
    
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(422).json({ 
        success:false,
         message: "Email already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(422).json({ 
        success:false,
         message: "Passwords do not match" });
    }

    // hashing password
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newuser.save();
    const token = createToken(user._id);
    res.json({
      token,
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to sign up! Try again"
    });
  }
}

export { loginUser, signupUser };
