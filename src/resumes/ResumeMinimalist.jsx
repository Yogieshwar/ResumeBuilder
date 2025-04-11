import React, { useState,useRef } from "react";
import { useSelector } from "react-redux";
import FontAndColorControls from "../components/FontAndColorControls";
import ExportResume from "../components/ExportResume";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "./ResumeMinimalist.css";

const ResumeMinimalist = () => {
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
    "summary",
    "education",
    "experience",
    "skills",
    "projects",
    "certifications",
    "hobbies"
  ]);

  const [fontStyle, setFontStyle] = useState("Helvetica");
  const [color, setColor] = useState("#333");

  const sections = [
    {
      id: "summary",
      label: "Summary",
      content: summary && <p>{summary}</p>,
    },
    {
      id: "education",
      label: "Education",
      content:
        education?.length > 0 &&
        education.map((edu, idx) => (
          <div key={idx}>
            <p><strong>{edu.degree}</strong> - {edu.school} ({edu.year})</p>
          </div>
        )),
    },
    {
      id: "experience",
      label: "Experience",
      content:
        experience?.length > 0 &&
        experience.map((exp, idx) => (
          <div key={idx}>
            <p><strong>{exp.role}</strong> at {exp.company} ({exp.year})</p>
            <p>{exp.description}</p>
          </div>
        )),
    },
    {
      id: "skills",
      label: "Skills",
      content: skills?.length > 0 && <p>{skills.join(", ")}</p>,
    },
    {
      id: "projects",
      label: "Projects",
      content:
        projects?.length > 0 &&
        projects.map((proj, idx) => (
          <div key={idx}>
            <p><strong>{proj.title}</strong></p>
            <p>{proj.description}</p>
            {proj.tech?.length > 0 && <p><em>Tech:</em> {proj.tech.join(", ")}</p>}
          </div>
        )),
    },
    {
      id: "certifications",
      label: "Certifications",
      content:
        certifications?.length > 0 && (
          <ul>{certifications.map((cert, idx) => <li key={idx}>{cert}</li>)}</ul>
        ),
    },
    {
      id: "hobbies",
      label: "Hobbies",
      content:
        hobbies?.length > 0 && (
          <ul>{hobbies.map((hobby, idx) => <li key={idx}>{hobby}</li>)}</ul>
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
  const resumeref=useRef();

  const getSectionById = (id) => sections.find((s) => s.id === id);
  

  return (
    <div className="resume-minimalist-wrapper">
      <FontAndColorControls
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        color={color}
        setColor={setColor}
      />

      <ExportResume  targetRef={resumeref}/>

      <div ref={resumeref} id="resume-content"  className="resume-minimalist" style={{ fontFamily: fontStyle, color }}>
        <header className="header">
          <h1>{personalInfo.name || "Your Name"}</h1>
          <p>{personalInfo.email} | {personalInfo.phone} | {personalInfo.address}</p>
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
                          <h3>{section.label}</h3>
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
  );
};

export default ResumeMinimalist;
