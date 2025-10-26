import React, { useState } from "react";
import AISuggestions from "./AISuggestions.js";
import axios from "axios";

const ResumeBuilder = () => {
  const [resume, setResume] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: ""
    },
    summary: "",
    experience: [
      {
        id: Date.now(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false
      }
    ],
    education: [
      {
        id: Date.now() + 1,
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: ""
      }
    ],
    skills: []
  });

  const [activeSection, setActiveSection] = useState("personal");

  // Add new experience entry
  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          current: false
        }
      ]
    }));
  };

  // Update experience entry
  const updateExperience = (index, field, value) => {
    setResume(prev => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value
      };
      return { ...prev, experience: updatedExperience };
    });
  };

  // Remove experience entry
  const removeExperience = (index) => {
    if (resume.experience.length > 1) {
      setResume(prev => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index)
      }));
    }
  };

  // Add new education entry
  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: ""
        }
      ]
    }));
  };

  // Add this function to your ResumeBuilder component
const handleSuggestionSelect = (suggestionText) => {
  if (activeSection === "summary") {
    setResume(prev => ({ ...prev, summary: suggestionText }));
  } else if (activeSection === "experience" && resume.experience.length > 0) {
    // For experience, update the first experience entry's description
    const updatedExperience = [...resume.experience];
    updatedExperience[0] = {
      ...updatedExperience[0],
      description: suggestionText
    };
    setResume(prev => ({ ...prev, experience: updatedExperience }));
  }
  // You can add more sections as needed
};

  // Update education entry
  const updateEducation = (index, field, value) => {
    setResume(prev => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value
      };
      return { ...prev, education: updatedEducation };
    });
  };

  // Remove education entry
  const removeEducation = (index) => {
    if (resume.education.length > 1) {
      setResume(prev => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      }));
    }
  };

  const addSkill = (e) => {
    if (e.key === "Enter") {
      const newSkill = e.target.value.trim();
      if (newSkill) {
        setResume(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
        e.target.value = "";
      }
    }
  };

  // Save resume function
  const saveResume = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/resume/save", resume);
      alert("✅ Resume saved successfully! ID: " + response.data.id);
    } catch (error) {
      console.error("Save error:", error);
      alert("❌ Failed to save resume. Please try again.");
    }
  };

  // PROFESSIONAL PDF DOWNLOAD FUNCTION
  const downloadPDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Professional Resume - ${resume.personalInfo.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: white;
            padding: 40px 50px;
            font-size: 14px;
            font-weight: 400;
          }
          
          .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
          }
          
          /* HEADER STYLES */
          .header {
            text-align: center;
            padding-bottom: 25px;
            margin-bottom: 30px;
            border-bottom: 2px solid #3b82f6;
          }
          
          .name {
            font-size: 32px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          
          .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 5px;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #6b7280;
            font-size: 13px;
          }
          
          /* SECTION STYLES */
          .section {
            margin-bottom: 28px;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
            padding-bottom: 6px;
            border-bottom: 1px solid #e5e7eb;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          /* SUMMARY STYLES */
          .summary {
            font-size: 14px;
            line-height: 1.7;
            color: #4b5563;
            text-align: justify;
          }
          
          /* EXPERIENCE & EDUCATION STYLES */
          .experience-item, .education-item {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 6px;
          }
          
          .company, .institution {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
          }
          
          .position, .degree {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 4px;
          }
          
          .date {
            font-size: 13px;
            color: #6b7280;
            font-weight: 400;
            white-space: nowrap;
          }
          
          .description {
            font-size: 13px;
            color: #4b5563;
            line-height: 1.6;
            margin-top: 6px;
          }
          
          .gpa {
            font-size: 13px;
            color: #059669;
            font-weight: 500;
            margin-top: 2px;
          }
          
          /* SKILLS STYLES */
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .skill-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #e5e7eb;
          }
          
          /* FOOTER */
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #9ca3af;
            font-size: 11px;
          }
          
          /* PRINT STYLES */
          @media print {
            body {
              padding: 20px;
            }
            .resume-container {
              max-width: 100%;
            }
            .section {
              page-break-inside: avoid;
            }
            .experience-item, .education-item {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          <!-- HEADER -->
          <div class="header">
            <h1 class="name">${resume.personalInfo.name || "Your Name"}</h1>
            <div class="contact-info">
              ${resume.personalInfo.email ? `<div class="contact-item">📧 ${resume.personalInfo.email}</div>` : ''}
              ${resume.personalInfo.phone ? `<div class="contact-item">📱 ${resume.personalInfo.phone}</div>` : ''}
              ${resume.personalInfo.address ? `<div class="contact-item">📍 ${resume.personalInfo.address}</div>` : ''}
              ${resume.personalInfo.linkedin ? `<div class="contact-item">💼 ${resume.personalInfo.linkedin}</div>` : ''}
              ${resume.personalInfo.github ? `<div class="contact-item">⚡ ${resume.personalInfo.github}</div>` : ''}
            </div>
          </div>

          <!-- PROFESSIONAL SUMMARY -->
          ${resume.summary ? `
          <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <div class="summary">${resume.summary}</div>
          </div>
          ` : ''}

          <!-- EXPERIENCE -->
          ${resume.experience.some(exp => exp.company || exp.position) ? `
          <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${resume.experience.map(exp => 
              exp.company || exp.position ? `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="company">${exp.company}</div>
                    <div class="position">${exp.position}</div>
                  </div>
                  <div class="date">${exp.startDate} - ${exp.current ? 'Present' : (exp.endDate || 'Present')}</div>
                </div>
                ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
              </div>
              ` : ''
            ).join('')}
          </div>
          ` : ''}

          <!-- EDUCATION -->
          ${resume.education.some(edu => edu.institution || edu.degree) ? `
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${resume.education.map(edu => 
              edu.institution || edu.degree ? `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="institution">${edu.institution}</div>
                    <div class="degree">${edu.degree} ${edu.field ? 'in ' + edu.field : ''}</div>
                  </div>
                  <div class="date">${edu.startDate} - ${edu.endDate}</div>
                </div>
                ${edu.gpa ? `<div class="gpa">GPA: ${edu.gpa}</div>` : ''}
              </div>
              ` : ''
            ).join('')}
          </div>
          ` : ''}

          <!-- SKILLS -->
          ${resume.skills.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Skills & Technologies</h2>
            <div class="skills-container">
              ${resume.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
          ` : ''}

          <!-- FOOTER -->
          <div class="footer">
            Generated with Smart Resume Builder | Professional Resume Template
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 1000);
  };

  // Inline styles
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px"
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#2563eb"
  };

  const mainContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto"
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "24px"
  };

  const contentGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "20px"
  };

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  };

  const buttonStyle = {
    padding: "12px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
    textAlign: "left"
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3b82f6",
    color: "white"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "16px",
    marginBottom: "16px"
  };

  const textareaStyle = {
    ...inputStyle,
    height: "80px",
    resize: "vertical"
  };

  const smallInputStyle = {
    ...inputStyle,
    marginBottom: "8px"
  };

  const skillTagStyle = {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    margin: "4px",
    display: "inline-block"
  };

  const previewStyle = {
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    padding: "24px",
    backgroundColor: "white"
  };

  const saveButtonStyle = {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "600",
    marginRight: "10px"
  };

  const downloadButtonStyle = {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "600"
  };

  const addButtonStyle = {
    backgroundColor: "#8b5cf6",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "10px"
  };

  const removeButtonStyle = {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px"
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  };

  const sectionContainerStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#f9fafb"
  };

  // Get current content for AI suggestions
  const getCurrentContent = () => {
    switch (activeSection) {
      case "personal":
        return `Name: ${resume.personalInfo.name}, Email: ${resume.personalInfo.email}, Phone: ${resume.personalInfo.phone}`;
      case "summary":
        return resume.summary;
      case "experience":
        return resume.experience.map(exp => 
          `${exp.position} at ${exp.company}: ${exp.description}`
        ).join(". ");
      case "education":
        return resume.education.map(edu => 
          `${edu.degree} at ${edu.institution}`
        ).join(". ");
      case "skills":
        return resume.skills.join(", ");
      default:
        return "";
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Smart Resume Builder</h1>
      
      <div style={mainContainerStyle}>
        <div style={contentGridStyle}>
          {/* Left Sidebar */}
          <div>
            <div style={{...cardStyle, marginBottom: "20px"}}>
              <div style={sidebarStyle}>
                {["personal", "summary", "experience", "education", "skills", "preview"].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    style={activeSection === section ? activeButtonStyle : buttonStyle}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <AISuggestions 
              section={activeSection} 
              content={getCurrentContent()} 
              onSuggestionSelect={handleSuggestionSelect}
            />
          </div>

          {/* Right Content */}
          <div style={cardStyle}>
            {activeSection === "personal" && (
              <div>
                <h2 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem"}}>
                  Personal Information
                </h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resume.personalInfo.name}
                  onChange={(e) => setResume(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                  style={inputStyle}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resume.personalInfo.email}
                  onChange={(e) => setResume(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  style={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={resume.personalInfo.phone}
                  onChange={(e) => setResume(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={resume.personalInfo.address}
                  onChange={(e) => setResume(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, address: e.target.value }
                  }))}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={resume.personalInfo.linkedin}
                  onChange={(e) => setResume(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                  }))}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={resume.personalInfo.github}
                  onChange={(e) => setResume(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, github: e.target.value }
                  }))}
                  style={inputStyle}
                />
              </div>
            )}

            {activeSection === "summary" && (
              <div>
                <h2 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem"}}>
                  Professional Summary
                </h2>
                <textarea
                  value={resume.summary}
                  onChange={(e) => setResume(prev => ({...prev, summary: e.target.value}))}
                  placeholder="Write a brief summary highlighting your professional background, key skills, and career objectives..."
                  style={{...textareaStyle, height: "120px"}}
                />
              </div>
            )}

            {activeSection === "experience" && (
              <div>
                <h2 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem"}}>
                  Work Experience
                </h2>
                <button onClick={addExperience} style={addButtonStyle}>
                  + Add Experience
                </button>
                
                {resume.experience.map((exp, index) => (
                  <div key={exp.id} style={sectionContainerStyle}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
                      <h3 style={{margin: 0}}>Experience #{index + 1}</h3>
                      {resume.experience.length > 1 && (
                        <button 
                          onClick={() => removeExperience(index)}
                          style={removeButtonStyle}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      style={smallInputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Job Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      style={smallInputStyle}
                    />
                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
                      <input
                        type="text"
                        placeholder="Start Date (e.g., Jan 2020)"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                        style={smallInputStyle}
                      />
                      <input
                        type="text"
                        placeholder="End Date (e.g., Dec 2022)"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                        style={smallInputStyle}
                      />
                    </div>
                    <textarea
                      placeholder="Job Description - Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                      style={textareaStyle}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeSection === "education" && (
              <div>
                <h2 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem"}}>
                  Education
                </h2>
                <button onClick={addEducation} style={addButtonStyle}>
                  + Add Education
                </button>
                
                {resume.education.map((edu, index) => (
                  <div key={edu.id} style={sectionContainerStyle}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
                      <h3 style={{margin: 0}}>Education #{index + 1}</h3>
                      {resume.education.length > 1 && (
                        <button 
                          onClick={() => removeEducation(index)}
                          style={removeButtonStyle}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Institution Name"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      style={smallInputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Degree (e.g., Bachelor of Science)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      style={smallInputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.field}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                      style={smallInputStyle}
                    />
                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
                      <input
                        type="text"
                        placeholder="Start Date (e.g., Aug 2016)"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                        style={smallInputStyle}
                      />
                      <input
                        type="text"
                        placeholder="End Date (e.g., May 2020)"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                        style={smallInputStyle}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="GPA"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      style={smallInputStyle}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeSection === "skills" && (
              <div>
                <h2 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem"}}>
                  Skills
                </h2>
                <input
                  type="text"
                  placeholder="Add a skill and press Enter"
                  onKeyPress={addSkill}
                  style={inputStyle}
                />
                <div>
                  {resume.skills.map((skill, index) => (
                    <span key={index} style={skillTagStyle}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "preview" && (
              <div>
                <h2 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem"}}>
                  Resume Preview
                </h2>
                <div style={previewStyle}>
                  <h1 style={{fontSize: "1.5rem", fontWeight: "bold", marginBottom: "8px"}}>
                    {resume.personalInfo.name || "Your Name"}
                  </h1>
                  <p style={{color: "#6b7280", marginBottom: "24px"}}>
                    {resume.personalInfo.email} 
                    {resume.personalInfo.phone && " | " + resume.personalInfo.phone}
                    {resume.personalInfo.linkedin && " | LinkedIn: " + resume.personalInfo.linkedin}
                    {resume.personalInfo.github && " | GitHub: " + resume.personalInfo.github}
                  </p>
                  
                  {resume.summary && (
                    <div style={{marginBottom: "20px"}}>
                      <h2 style={{fontSize: "1.25rem", fontWeight: "600", borderBottom: "2px solid #e5e7eb", paddingBottom: "8px"}}>
                        Summary
                      </h2>
                      <p style={{marginTop: "8px"}}>{resume.summary}</p>
                    </div>
                  )}

                  {resume.experience.some(exp => exp.company || exp.position) && (
                    <div style={{marginBottom: "20px"}}>
                      <h2 style={{fontSize: "1.25rem", fontWeight: "600", borderBottom: "2px solid #e5e7eb", paddingBottom: "8px"}}>
                        Experience
                      </h2>
                      {resume.experience.map((exp, index) => (
                        (exp.company || exp.position) && (
                          <div key={index} style={{marginBottom: "15px"}}>
                            <div style={{fontWeight: "600"}}>{exp.company}</div>
                            <div style={{fontStyle: "italic"}}>{exp.position}</div>
                            <div style={{color: "#6b7280", fontSize: "14px"}}>
                              {exp.startDate} - {exp.endDate || "Present"}
                            </div>
                            <div style={{marginTop: "5px"}}>{exp.description}</div>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {resume.education.some(edu => edu.institution || edu.degree) && (
                    <div style={{marginBottom: "20px"}}>
                      <h2 style={{fontSize: "1.25rem", fontWeight: "600", borderBottom: "2px solid #e5e7eb", paddingBottom: "8px"}}>
                        Education
                      </h2>
                      {resume.education.map((edu, index) => (
                        (edu.institution || edu.degree) && (
                          <div key={index} style={{marginBottom: "15px"}}>
                            <div style={{fontWeight: "600"}}>{edu.institution}</div>
                            <div style={{fontStyle: "italic"}}>
                              {edu.degree} {edu.field && "in " + edu.field}
                            </div>
                            <div style={{color: "#6b7280", fontSize: "14px"}}>
                              {edu.startDate} - {edu.endDate}
                              {edu.gpa && " | GPA: " + edu.gpa}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {resume.skills.length > 0 && (
                    <div>
                      <h2 style={{fontSize: "1.25rem", fontWeight: "600", borderBottom: "2px solid #e5e7eb", paddingBottom: "8px"}}>
                        Skills
                      </h2>
                      <div style={{marginTop: "8px"}}>
                        {resume.skills.map((skill, index) => (
                          <span key={index} style={{...skillTagStyle, backgroundColor: "#f3f4f6", color: "#374151"}}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div style={buttonContainerStyle}>
              <button onClick={saveResume} style={saveButtonStyle}>
                💾 Save to Database
              </button>
              <button onClick={downloadPDF} style={downloadButtonStyle}>
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;