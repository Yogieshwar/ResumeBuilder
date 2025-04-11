import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "./ResumeClassic.css";
import FontAndColorControls from "../components/FontAndColorControls";
import ExportResume from "../components/ExportResume";


const ResumeClassic = () => {
  const resume = useSelector((state) => state.resume);
  const {
    personalInfo,
    summary,
    skills,
    education,
    experience,
    projects,
    certifications,
    hobbies,
  } = resume;

  const resumeRef = useRef();

  const [sectionOrder, setSectionOrder] = useState([
    "about-me",
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
    "hobbies",
  ]);
  const [fontStyle, setFontStyle] = useState("Arial");
  const [color, setColor] = useState("#333");

  const sections = [
    {
      id: "about-me",
      label: "About Me",
      content: summary && <p>{summary}</p>,
    },
    {
      id: "education",
      label: "Education",
      content:
        education?.length > 0 &&
        education.map((edu, idx) => (
          <div key={idx} className="resume-entry">
            <strong>{edu.degree}</strong>
            <p>{edu.school}, {edu.year}</p>
          </div>
        )),
    },
    {
      id: "experience",
      label: "Work Experience",
      content:
        experience?.length > 0 &&
        experience.map((exp, idx) => (
          <div key={idx} className="resume-entry">
            <strong>{exp.role}</strong> at {exp.company} ({exp.year})
            <p>{exp.description}</p>
          </div>
        )),
    },
    {
      id: "skills",
      label: "Software Skills",
      content:
        skills?.length > 0 && (
          <ul className="resume-list">
            {skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
          </ul>
        ),
    },
    {
      id: "projects",
      label: "Projects",
      content:
        projects?.length > 0 &&
        projects.map((proj, idx) => (
          <div key={idx} className="resume-entry">
            <strong>{proj.title}</strong>
            <p>{proj.description}</p>
            {proj.tech?.length > 0 && <p><em>Technologies:</em> {proj.tech.join(", ")}</p>}
          </div>
        )),
    },
    {
      id: "certifications",
      label: "Certifications",
      content:
        certifications?.length > 0 && (
          <ul className="resume-list">
            {certifications.map((cert, idx) => <li key={idx}>{cert}</li>)}
          </ul>
        ),
    },
    {
      id: "hobbies",
      label: "Hobbies",
      content:
        hobbies?.length > 0 && (
          <ul className="resume-list">
            {hobbies.map((hobby, idx) => <li key={idx}>{hobby}</li>)}
          </ul>
        ),
    },
  ];

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(sectionOrder);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setSectionOrder(reordered);
  };

  const getSectionById = (id) => sections.find((s) => s.id === id);

  return (
    <div className="resume-builder-container">
      <FontAndColorControls
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        color={color}
        setColor={setColor}
      />

      <ExportResume  targetRef={resumeRef} />
      

      <div className="resume-classic-wrapper">
        <div ref={resumeRef} className="resume-classic" id="resume-content" style={{ fontFamily: fontStyle, color }}>
          <header className="resume-header">
            <div className="left-panel">
              <h1>{personalInfo.name || "Your Name"}</h1>
              <h2>{personalInfo.title || "Professional Title"}</h2>
            </div>
            <div className="right-panel">
              <h3>Contact</h3>
              {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
              {personalInfo.email && <p>📧 {personalInfo.email}</p>}
              {personalInfo.linkedinUrl && <p>🔗 {personalInfo.linkedinUrl}</p>}
              {personalInfo.address && <p>🏠 {personalInfo.address}</p>}
            </div>
          </header>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {sectionOrder.map((sectionId, index) => {
                    const section = getSectionById(sectionId);
                    if (!section || !section.content) return null;
                    return (
                      <Draggable key={sectionId} draggableId={sectionId} index={index}>
                        {(provided) => (
                          <section
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="resume-section"
                          >
                            <h3 className="section-title">{section.label}</h3>
                            {section.content}
                          </section>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ResumeClassic;
