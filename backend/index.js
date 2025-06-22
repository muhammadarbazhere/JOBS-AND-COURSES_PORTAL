const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();
const path = require("path");

const userRoutes = require("./routes/UserRoutes");
const courseRoutes = require("./routes/CourseRoutes");
const jobInternshipRoutes = require('./routes/JobRoutes');
const applyJobRoutes = require('./routes/applyJobRoutes');
const cartRoutes = require('./routes/cartRoutes');
const payPalRoutes = require('./routes/paypalRoutes');
const creditCardRoutes = require('./routes/creditRoutes');

const app = express();
const port = process.env.PORT || 3000; // Use the port assigned by Render

// Security middleware
app.use(helmet());

// CORS setup, ensuring your frontend's URL is allowed
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173", // Ensure CLIENT_URL is set in Render for production
}));

app.use(cookieParser());
app.use(express.json());

// Serve static files (e.g., uploads)
app.use("/route/uploads", express.static(path.join(__dirname, "uploads")));

// Payment routes
app.use('/route/payment', payPalRoutes);
app.use('/route/payment', creditCardRoutes);

// API routes
app.use("/route", userRoutes);
app.use("/route/courses", courseRoutes);
app.use("/route/cart", cartRoutes);
app.use('/route/jobs-internships', jobInternshipRoutes);
app.use("/route/form", applyJobRoutes);

// Serve frontend static files (if deployed fullstack on Render)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Serve the React frontend for any unrecognized routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
}
connectDB();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
