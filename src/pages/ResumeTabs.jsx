import React, { useState } from "react";
import ResumeClassic from "../resumes/ResumeClassic";
import ResumeModern from "../resumes/ResumeModern";
import ResumeMinimalist from "../resumes/ResumeMinimalist";
import ResumeElegant from "../resumes/ResumeElegant";
import { useNavigate } from "react-router-dom";
import '../index.css'

const ResumeTabs = () => {
  const navigate =useNavigate();
  const [activeTab, setActiveTab] = useState("classic");

  const renderActiveResume = () => {
    switch (activeTab) {
      case "modern":
        return <ResumeModern />;
      case "minimalist":
        return <ResumeMinimalist />;
      case "elegant":
        return <ResumeElegant />;
      default:
        return <ResumeClassic />;
    }
  };
  const handleClick=()=>{
    navigate('/resumeform')

  }

  return (
    <div className="resume-layout">
      <div className="tab-sidebar">
        <h3>Select Template</h3>
        <button
          className={activeTab === "classic" ? "active" : ""}
          onClick={() => setActiveTab("classic")}
        >
          Classic
        </button>
        <button
          className={activeTab === "modern" ? "active" : ""}
          onClick={() => setActiveTab("modern")}
        >
          Modern
        </button>
        <button
          className={activeTab === "minimalist" ? "active" : ""}
          onClick={() => setActiveTab("minimalist")}
        >
          Minimalist
        </button>
        <button
          className={activeTab === "elegant" ? "active" : ""}
          onClick={() => setActiveTab("elegant")}
        >
          Elegant
        </button>
        <button className="btn bg-blue-800" onClick={handleClick}>
          Go Back 
        </button>
      </div>

      <div className="resume-preview">
        {renderActiveResume()}
      </div>
    </div>
  );
};

export default ResumeTabs;
