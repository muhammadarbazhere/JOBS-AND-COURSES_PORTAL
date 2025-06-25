const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();
const path = require("path");

// Route files
const userRoutes = require("./routes/UserRoutes");
const courseRoutes = require("./routes/CourseRoutes");
const jobInternshipRoutes = require('./routes/JobRoutes');
const applyJobRoutes = require('./routes/applyJobRoutes');
const cartRoutes = require('./routes/cartRoutes');
const payPalRoutes = require('./routes/paypalRoutes');
const creditCardRoutes = require('./routes/creditRoutes');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Security middleware
app.use(helmet());

// ✅ CORS setup for cross-origin requests and cookies
app.use(cors({
  origin: process.env.FRONTEND_BASE_URL ||  "http://localhost:5173", 
  
  // e.g., https://your-frontend.vercel.app
  credentials: true,
}));

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());

// ✅ Serve static uploads
app.use("/route/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/route", userRoutes);
app.use("/route/courses", courseRoutes);
app.use("/route/cart", cartRoutes);
app.use('/route/jobs-internships', jobInternshipRoutes);
app.use("/route/form", applyJobRoutes);
app.use("/route/payment", payPalRoutes);
app.use("/route/payment", creditCardRoutes);

// ✅ Root route to test Render deployment
app.get("/", (req, res) => {
  res.status(200).send("Backend is live ✅");
});

// ✅ MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
  }
}
connectDB();

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
