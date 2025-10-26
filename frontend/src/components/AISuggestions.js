import React, { useState } from "react";
import axios from "axios";

const AISuggestions = ({ section, content, onSuggestionSelect }) => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("suggestions");

  const getAISuggestion = async () => {
    if (!content || content.trim().length < 3) {
      setSuggestion("📝 Please add some content first to get personalized AI suggestions. Write at least a few words about your experience or skills.");
      return;
    }

    setLoading(true);
    setError("");
    setSuggestion("");
    setActiveTab("suggestions");

    try {
      const response = await axios.post("http://localhost:5000/api/ai/suggest-improvements", {
        section: section,
        content: content
      });
      
      if (response.data.success) {
        setSuggestion(response.data.suggestion);
      } else {
        setSuggestion(response.data.suggestion);
      }
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      setError("Failed to connect to AI service. Please check if the backend is running.");
      setSuggestion("🚨 Connection Error: Make sure your backend server is running on http://localhost:5000");
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestionText) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestionText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("✅ Copied to clipboard!");
    });
  };

  // Parse suggestions and extract different versions
  const parseSuggestions = () => {
    if (!suggestion) return { versions: [], tips: [] };

    const versions = [];
    const tips = [];
    
    // Split by numbered sections
    const sections = suggestion.split(/\d+\.\s+\*\*/).filter(s => s.trim());
    
    sections.forEach(section => {
      if (section.includes("**")) {
        const titleEnd = section.indexOf("**");
        const title = section.substring(0, titleEnd).trim();
        const content = section.substring(titleEnd + 2).trim();
        
        if (title.toLowerCase().includes("version") || title.toLowerCase().includes("approach")) {
          versions.push({ title, content });
        } else if (title.toLowerCase().includes("tip") || title.toLowerCase().includes("verb") || title.toLowerCase().includes("quantification")) {
          tips.push({ title, content });
        }
      }
    });

    // If no structured versions found, treat entire suggestion as one version
    if (versions.length === 0 && suggestion) {
      versions.push({ title: "AI Suggestion", content: suggestion });
    }

    return { versions, tips };
  };

  const { versions, tips } = parseSuggestions();

  const containerStyle = {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "16px",
    marginTop: "20px"
  };

  const buttonStyle = {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "12px",
    fontSize: "14px",
    fontWeight: "600"
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#9ca3af",
    cursor: "not-allowed"
  };

  const tabStyle = {
    padding: "8px 16px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "2px solid transparent"
  };

  const activeTabStyle = {
    ...tabStyle,
    borderBottom: "2px solid #10b981",
    color: "#10b981",
    fontWeight: "600"
  };

  const suggestionCardStyle = {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    position: "relative"
  };

  const actionButtonStyle = {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    marginRight: "8px",
    marginTop: "8px"
  };

  const tipStyle = {
    backgroundColor: "#fef3c7",
    border: "1px solid #f59e0b",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "8px",
    fontSize: "13px"
  };

  const loadingStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b7280",
    padding: "20px"
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "600", color: "#1f2937" }}>
        🤖 AI Resume Coach
      </h3>
      
      {error && <div style={{ color: "#ef4444", fontSize: "12px", marginBottom: "8px" }}>{error}</div>}
      
      <button 
        onClick={getAISuggestion} 
        style={loading || !content ? disabledButtonStyle : buttonStyle}
        disabled={loading || !content}
      >
        {loading ? "🔄 AI is thinking..." : "🚀 Get Smart Suggestions"}
      </button>

      {suggestion && (
        <div>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: "12px" }}>
            <button 
              style={activeTab === "suggestions" ? activeTabStyle : tabStyle}
              onClick={() => setActiveTab("suggestions")}
            >
              💡 Suggestions ({versions.length})
            </button>
            {tips.length > 0 && (
              <button 
                style={activeTab === "tips" ? activeTabStyle : tabStyle}
                onClick={() => setActiveTab("tips")}
              >
                📚 Tips ({tips.length})
              </button>
            )}
          </div>

          {/* Suggestions Tab */}
          {activeTab === "suggestions" && (
            <div>
              {versions.map((version, index) => (
                <div key={index} style={suggestionCardStyle}>
                  <h4 style={{ margin: "0 0 8px 0", color: "#059669", fontSize: "14px" }}>
                    {version.title}
                  </h4>
                  <p style={{ margin: "0", lineHeight: "1.5", fontSize: "13px" }}>
                    {version.content}
                  </p>
                  <div>
                    <button 
                      style={actionButtonStyle}
                      onClick={() => applySuggestion(version.content)}
                    >
                      📝 Use This
                    </button>
                    <button 
                      style={{...actionButtonStyle, backgroundColor: "#8b5cf6"}}
                      onClick={() => copyToClipboard(version.content)}
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>
              ))}
              
              {versions.length === 0 && (
                <div style={suggestionCardStyle}>
                  <p style={{ margin: "0", lineHeight: "1.5" }}>{suggestion}</p>
                  <button 
                    style={actionButtonStyle}
                    onClick={() => applySuggestion(suggestion)}
                  >
                    📝 Use This Suggestion
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === "tips" && (
            <div>
              {tips.map((tip, index) => (
                <div key={index} style={tipStyle}>
                  <strong style={{ color: "#92400e" }}>{tip.title}:</strong>
                  <p style={{ margin: "4px 0 0 0", color: "#92400e" }}>{tip.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div style={loadingStyle}>
          <div>
            <div>🎯 Analyzing your content...</div>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
              Generating personalized suggestions for your resume
            </div>
          </div>
        </div>
      )}

      {!suggestion && !loading && (
        <div style={{ 
          backgroundColor: "white", 
          border: "1px solid #d1d5db", 
          borderRadius: "6px", 
          padding: "16px", 
          textAlign: "center",
          color: "#6b7280",
          fontSize: "13px"
        }}>
          <div>✨ Click the button to get AI-powered resume suggestions</div>
          <div style={{ fontSize: "12px", marginTop: "4px" }}>
            {!content ? "Add some content first for better suggestions" : "We'll analyze your text and provide improvements"}
          </div>
        </div>
      )}

      <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "8px", textAlign: "center" }}>
        💡 Write complete sentences for the best AI suggestions
      </div>
    </div>
  );
};

export default AISuggestions;