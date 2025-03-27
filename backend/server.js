const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Correct dotenv configuration
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const cookieParser = require("cookie-parser");

const allowedOrigins = ["http://localhost:5173"];

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend domain
    credentials: true, // Allow cookies & authentication
  })
);
app.use(express.json()); // Allows parsing JSON request bodies
app.use(cookieParser());

app.use("/api/expense", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.get("/check-cookies", (req, res) => {
  console.log("Cookies received:", req.cookies); // Debugging cookies
  res.json(req.cookies);
});


// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    tlsAllowInvalidCertificates: true,
  })

  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
