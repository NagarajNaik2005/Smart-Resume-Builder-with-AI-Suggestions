const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: String,
    linkedin: String,
    github: String
  },
  summary: String,
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String,
    current: { type: Boolean, default: false }
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String
  }],
  skills: [String],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resume", resumeSchema);