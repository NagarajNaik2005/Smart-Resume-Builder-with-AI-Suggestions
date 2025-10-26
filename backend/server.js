const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/resume", require("./routes/resume"));
app.use("/api/ai", require("./routes/ai"));

// Test route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Smart Resume Builder API is running!",
    version: "1.0.0",
    status: "Backend with Enhanced AI Suggestions"
  });
});

app.listen(PORT, () => {
  console.log(`🎯 Server running on port ${PORT}`);
  console.log(`📱 API URL: http://localhost:${PORT}`);
  console.log(`🗄️  MongoDB: Connected`);
  console.log(`🤖 AI: Enhanced Suggestions Ready`);
});