const express = require("express");
const router = express.Router();

// Intelligent AI Suggestion System
router.post("/suggest-improvements", async (req, res) => {
  try {
    const { section, content } = req.body;

    console.log("🎯 User Input:", content);

    if (!content || content.trim().length < 3) {
      return res.json({
        success: true,
        suggestion: "📝 Please write more about yourself to get personalized suggestions."
      });
    }

    // Intelligent content analysis
    const analysis = analyzeContent(content);
    
    // Generate personalized suggestions
    const suggestions = generatePersonalizedSuggestions(analysis, section);
    
    console.log("✅ Generated personalized suggestions for:", analysis.profession);
    
    res.json({ 
      success: true,
      suggestion: suggestions
    });
    
  } catch (error) {
    console.error("❌ Error:", error);
    
    res.json({ 
      success: true,
      suggestion: generateFallbackSuggestions(req.body.content)
    });
  }
});

// Intelligent content analyzer
function analyzeContent(content) {
  const contentLower = content.toLowerCase();
  
  // Profession detection
  let profession = "Professional";
  if (contentLower.includes("game") || contentLower.includes("unity") || contentLower.includes("c#") || contentLower.includes("unreal")) {
    profession = "Game Developer";
  } else if (contentLower.includes("web") || contentLower.includes("javascript") || contentLower.includes("react") || contentLower.includes("node")) {
    profession = "Web Developer";
  } else if (contentLower.includes("software") || contentLower.includes("java") || contentLower.includes("python") || contentLower.includes("c++")) {
    profession = "Software Developer";
  } else if (contentLower.includes("data") || contentLower.includes("analyst") || contentLower.includes("sql") || contentLower.includes("tableau")) {
    profession = "Data Analyst";
  } else if (contentLower.includes("mobile") || contentLower.includes("android") || contentLower.includes("ios") || contentLower.includes("flutter")) {
    profession = "Mobile Developer";
  } else if (contentLower.includes("cloud") || contentLower.includes("aws") || contentLower.includes("azure") || contentLower.includes("devops")) {
    profession = "Cloud Engineer";
  }

  // Extract technologies mentioned
  const techKeywords = {
    "Game Developer": ["Unity", "C#", "Unreal Engine", "3D Graphics", "Game Design", "VR/AR", "Mobile Games", "Physics Engines"],
    "Web Developer": ["JavaScript", "React", "Node.js", "HTML/CSS", "MongoDB", "Express", "REST APIs", "Vue.js"],
    "Software Developer": ["Java", "Python", "C++", "Algorithms", "System Design", "Databases", "Testing", "Architecture"],
    "Data Analyst": ["Python", "SQL", "Excel", "Tableau", "Machine Learning", "Statistics", "Data Visualization", "Power BI"],
    "Mobile Developer": ["Android", "iOS", "Flutter", "React Native", "Kotlin", "Swift", "Mobile UI/UX", "App Store"],
    "Cloud Engineer": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Infrastructure", "Security", "Networking"]
  };

  // Extract years of experience
  let years = "3+";
  const yearMatch = content.match(/\d+\s*(year|yr)/i);
  if (yearMatch) years = yearMatch[0];

  // Extract specific technologies from user input
  const userTechs = [];
  const allTechs = [...techKeywords["Game Developer"], ...techKeywords["Web Developer"], ...techKeywords["Software Developer"], ...techKeywords["Data Analyst"], ...techKeywords["Mobile Developer"], ...techKeywords["Cloud Engineer"]];
  
  allTechs.forEach(tech => {
    if (contentLower.includes(tech.toLowerCase())) {
      userTechs.push(tech);
    }
  });

  return {
    profession,
    years,
    userTechnologies: userTechs.length > 0 ? userTechs : techKeywords[profession] || techKeywords["Software Developer"],
    originalContent: content
  };
}

// Generate personalized suggestions
function generatePersonalizedSuggestions(analysis, section) {
  const { profession, years, userTechnologies, originalContent } = analysis;

  // Profession-specific metrics and achievements
  const professionMetrics = {
    "Game Developer": ["60 FPS performance", "100,000+ downloads", "4.5+ star ratings", "40% faster loading", "award-winning graphics"],
    "Web Developer": ["60% faster load times", "10,000+ monthly users", "99.9% uptime", "mobile-responsive design", "SEO optimization"],
    "Software Developer": ["50% performance improvement", "5x scalability", "99.9% reliability", "automated testing", "code quality"],
    "Data Analyst": ["25% cost reduction", "95% prediction accuracy", "2x faster insights", "data-driven decisions", "reporting automation"],
    "Mobile Developer": ["4.8+ app store rating", "1M+ downloads", "crash-free performance", "battery optimization", "user retention"],
    "Cloud Engineer": ["40% cost reduction", "99.99% availability", "auto-scaling", "security compliance", "disaster recovery"]
  };

  const metrics = professionMetrics[profession] || professionMetrics["Software Developer"];

  if (section === "summary") {
    return `
🎯 **Personalized Summary Suggestions for ${profession}**

Based on your input: **"${originalContent}"**

---

### 💡 **Choose Your Style:**

**1. 🚀 Achievement-Focused:**
"Results-driven ${profession} with ${years} years of experience specializing in ${userTechnologies.slice(0, 3).join(', ')}. Successfully delivered 15+ projects achieving ${metrics[0]} and ${metrics[1]}. Passionate about creating innovative solutions and driving technical excellence."

**2. 🛠️ Skills-Based:**
"Expert ${profession} with comprehensive expertise in ${userTechnologies.slice(0, 4).join(', ')}. Strong background in full development lifecycle, agile methodologies, and cross-functional team leadership. Proven ability to transform complex requirements into scalable, high-performance solutions."

**3. 📈 Impact-Oriented:**
"Strategic ${profession} who leverages ${userTechnologies[0]} and ${userTechnologies[1]} to deliver measurable business impact. Enhanced system performance by ${metrics[2]}, improved team productivity by 40%, and reduced operational costs through innovative technical solutions."

---

### ✨ **Professional Enhancements:**

**Action Verbs for ${profession}:**
• Developed • Engineered • Optimized • Architected
• Implemented • Streamlined • Automated • Transformed

**Quantifiable Achievements:**
• Improved ${metrics[0].toLowerCase()}
• Served ${metrics[1].toLowerCase()}
• Reduced costs by 25-40%
• Increased efficiency by 50-70%

**Technologies to Highlight:**
${userTechnologies.map(tech => `• ${tech}`).join('\n')}

**💡 Pro Tip:** Mix and match elements from different versions to create your perfect summary!
`;
  }

  // For other sections
  return `
🎯 **Personalized ${section.charAt(0).toUpperCase() + section.slice(1)} Suggestions**

Based on your input: **"${originalContent}"**

**Professional ${section} improvements for ${profession}:**

### 1. **Enhanced Version:**
"${originalContent} with demonstrated expertise in ${userTechnologies.slice(0, 2).join(' and ')}. Successfully achieved ${metrics[0]} through strategic implementation and best practices."

### 2. **Detailed Version:**
"${originalContent}. Specialized in ${userTechnologies.slice(0, 3).join(', ')}, with proven ability to deliver ${metrics[1]} and drive project success through technical excellence and collaborative problem-solving."

### 3. **Impact Version:**
"${originalContent}. Generated significant value through ${metrics[2]}, improved operational efficiency, and delivered exceptional results in fast-paced, dynamic environments."

**Quick ${profession} Tips:**
• Use specific numbers and metrics
• Mention ${userTechnologies.slice(0, 2).join(' and ')} expertise
• Focus on business impact and results
• Include team leadership if applicable
`;
}

// Fallback suggestions
function generateFallbackSuggestions(content) {
  return `
✨ **Professional Resume Coach**

Based on your input: **"${content}"**

**Here's how to improve it:**

### 🚀 **Strong Opening:**
Start with action verbs and be specific about your role and achievements.

### 📊 **Add Numbers:**
Include metrics like "improved performance by 40%" or "managed team of 8".

### 🛠️ **Technical Details:**
Mention specific technologies, tools, and methodologies you used.

### 🎯 **Focus on Results:**
Show how your work made an impact - increased efficiency, reduced costs, improved quality.

**Example Transformation:**
Before: "${content}"
After: "Experienced professional who successfully ${content} with measurable results, achieving significant improvements through technical expertise and strategic implementation."

**💡 Remember:** Be specific, quantify achievements, and focus on value created!
`;
}

module.exports = router;