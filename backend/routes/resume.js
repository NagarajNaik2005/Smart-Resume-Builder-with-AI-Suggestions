const express = require("express");
const Resume = require("../models/Resume");
const router = express.Router();

// Save resume
router.post("/save", async (req, res) => {
  try {
    const resumeData = req.body;
    const resume = new Resume(resumeData);
    await resume.save();
    res.json({ 
      success: true, 
      id: resume._id, 
      message: "✅ Resume saved successfully!" 
    });
  } catch (error) {
    console.error("❌ Save Error:", error);
    res.status(500).json({ error: "Failed to save resume" });
  }
});

// Get resume by ID
router.get("/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
});

// Get all resumes
router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error("❌ Fetch All Error:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

module.exports = router;