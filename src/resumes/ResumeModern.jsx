import React, { useState,useRef } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import FontAndColorControls from "../components/FontAndColorControls";
import ExportResume from "../components/ExportResume";
import "./ResumeModern.css";

const ResumeModern = () => {
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

  const [sectionOrder, setSectionOrder] = useState([
    "summary", "education", "experience", "skills", "projects", "certifications", "hobbies"
  ]);
  const [fontStyle, setFontStyle] = useState("Poppins");
  const [color, setColor] = useState("#003366");

  const sections = [
    {
      id: "summary",
      label: "About Me",
      content: summary && <p>{summary}</p>,
    },
    {
      id: "education",
      label: "Education",
      content:
        education?.length > 0 &&
        education.map((edu, idx) => (
          <div key={idx}>
            <p className="bold">{edu.degree}</p>
            <p>{edu.school} | {edu.year}</p>
          </div>
        )),
    },
    {
      id: "experience",
      label: "Work Experience",
      content:
        experience?.length > 0 &&
        experience.map((exp, idx) => (
          <div key={idx}>
            <p className="bold">
              {exp.role} at {exp.company} ({exp.year})
            </p>
            <p>{exp.description}</p>
          </div>
        )),
    },
    {
      id: "skills",
      label: "Skills",
      content:
        skills?.length > 0 && (
          <ul className="pill-list">
            {skills.map((skill, idx) => (
              <li key={idx} className="pill">{skill}</li>
            ))}
          </ul>
        ),
    },
    {
      id: "projects",
      label: "Projects",
      content:
        projects?.length > 0 &&
        projects.map((proj, idx) => (
          <div key={idx}>
            <p className="bold">{proj.title}</p>
            <p>{proj.description}</p>
            {proj.tech?.length > 0 && (
              <p><em>Tech Used:</em> {proj.tech.join(", ")}</p>
            )}
          </div>
        )),
    },
    {
      id: "certifications",
      label: "Certifications",
      content:
        certifications?.length > 0 && (
          <ul>
            {certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
        ),
    },
    {
      id: "hobbies",
      label: "Hobbies",
      content:
        hobbies?.length > 0 && (
          <ul>
            {hobbies.map((hobby, idx) => (
              <li key={idx}>{hobby}</li>
            ))}
          </ul>
        ),
    },
  ];

  const getSectionById = (id) => sections.find((s) => s.id === id);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(sectionOrder);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setSectionOrder(reordered);
  };
  const resumeRef = useRef()

  return (
    <div className="resume-builder-container">
      <FontAndColorControls
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        color={color}
        setColor={setColor}
      />
      <ExportResume  targetRef={resumeRef} />

      <div ref={resumeRef}  className="resume-modern" id="resume-content" style={{ fontFamily: fontStyle }}>
        <aside className="sidebar" style={{ backgroundColor: color }}>
          <h1>{personalInfo.name || "Your Name"}</h1>
          <div className="contact">
            {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
            {personalInfo.email && <p>📧 {personalInfo.email}</p>}
            {personalInfo.linkedinUrl && <p>🔗 {personalInfo.linkedinUrl}</p>}
            {personalInfo.address && <p>📍 {personalInfo.address}</p>}
          </div>
        </aside>

        <main className="resume-main">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="resume-sections">
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
                            <h3 style={{ borderColor: color }}>{section.label}</h3>
                            <div>{section.content}</div>
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
        </main>
      </div>
    </div>
  );
};

export default ResumeModern;
