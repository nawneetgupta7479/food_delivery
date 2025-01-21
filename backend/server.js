import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// CORS configuration
const allowedOrigins = [
  process.env.ADMIN_FRONTEND_URL || 'http://localhost:5174', // Admin Frontend URL
  process.env.FRONTEND_URL || 'http://localhost:5173', // Main Website Frontend URL
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from allowed origins or no origin in case of non-browser requests (e.g., Postman)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// DB connection
connectDB().then(() => {
  // Start server only if DB connection is successful
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);  // Exit if DB connection fails
});

// API routes
app.use("/api/food", foodRoute);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend part");
});
