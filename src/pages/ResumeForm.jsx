import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateCertifications,
  updatePersonalInfo,
  updateSummary,
  updateSkills,
  updateEducation,
  updateExperience,
  updateProjects,
  updateHobbies,
} from "../slice/ResumeSlice";

const ResumeForm = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  console.log(useSelector((state)=>state.resume))
const Handlenavigate=()=>{
  navigate('/resumetabs')
}

  if (!resume) {
    return <div>Loading...</div>; // or fallback UI
  }

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ ...resume.personalInfo, [name]: value }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = resume.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    dispatch(updateEducation(updated));
  };
  

  const addEducation = () => {
    dispatch(
      updateEducation([
        ...resume.education,
        { school: "", degree: "", year: "" },
      ])
    );
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = resume.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    dispatch(updateExperience(updated));
  };
  

  const addExperience = () => {
    dispatch(
      updateExperience([
        ...resume.experience,
        { company: "", role: "", year: "", description: "" },
      ])
    );
  };

  const handleProjectChange = (index, field, value) => {
    const updated = resume.projects.map((proj, i) =>
      i === index
        ? {
            ...proj,
            [field]:
              field === "tech" ? value.split(",").map((t) => t.trim()) : value,
          }
        : proj
    );
    dispatch(updateProjects(updated));
  };
  

  const addProject = () => {
    dispatch(
      updateProjects([
        ...resume.projects,
        { title: "", description: "", tech: [] },
      ])
    );
  };

  const handleCertificationsChange = (index, value) => {
    const updated = [...resume.certifications];
    updated[index] = value;
    dispatch(updateCertifications(updated));
  };

  const addCertification = () => {
    dispatch(updateCertifications([...resume.certifications, ""]));
  };

  const handleHobbiesChange = (index, value) => {
    const updated = [...resume.hobbies];
    updated[index] = value;
    dispatch(updateHobbies(updated));
  };

  const addHobby = () => {
    dispatch(updateHobbies([...resume.hobbies, ""]));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>

      {/* Personal Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {["name", "email", "phone", "address", "linkedinUrl"].map(
          (field) => (
            <input
              key={field}
              name={field}
              value={resume.personalInfo[field]}
              onChange={handlePersonalInfoChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border p-2 rounded w-full"
            />
          )
        )}
      </div>

      {/* Summary */}
      <textarea
        value={resume.summary}
        onChange={(e) => dispatch(updateSummary(e.target.value))}
        placeholder="Summary"
        rows={4}
        className="border p-2 rounded w-full mb-6"
      />

      {/* Skills */}
      <input
        type="text"
        value={resume.skills.join(", ")}
        onChange={(e) =>
          dispatch(updateSkills(e.target.value.split(",").map((s) => s.trim())))
        }
        placeholder="Skills (comma separated)"
        className="border p-2 rounded w-full mb-6"
      />

      {/* Education */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Education</h3>
        {resume.education.map((edu, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
            <input
              value={edu.school}
              onChange={(e) =>
                handleEducationChange(idx, "school", e.target.value)
              }
              placeholder="School"
              className="border p-2 rounded"
            />
            <input
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(idx, "degree", e.target.value)
              }
              placeholder="Degree"
              className="border p-2 rounded"
            />
            <input
              value={edu.year}
              onChange={(e) =>
                handleEducationChange(idx, "year", e.target.value)
              }
              placeholder="Year"
              className="border p-2 rounded"
            />
          </div>
        ))}
        <button
          onClick={addEducation}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add More
        </button>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        {resume.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
              <input
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(idx, "company", e.target.value)
                }
                placeholder="Company"
                className="border p-2 rounded"
              />
              <input
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(idx, "role", e.target.value)
                }
                placeholder="Role"
                className="border p-2 rounded"
              />
              <input
                value={exp.year}
                onChange={(e) =>
                  handleExperienceChange(idx, "year", e.target.value)
                }
                placeholder="Year"
                className="border p-2 rounded"
              />
            </div>
            <textarea
              value={exp.description}
              onChange={(e) =>
                handleExperienceChange(idx, "description", e.target.value)
              }
              placeholder="Description"
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
        <button
          onClick={addExperience}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add More
        </button>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Projects</h3>
        {resume.projects.map((proj, idx) => (
          <div key={idx} className="mb-4">
            <input
              value={proj.title}
              onChange={(e) =>
                handleProjectChange(idx, "title", e.target.value)
              }
              placeholder="Project Title"
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              value={proj.description}
              onChange={(e) =>
                handleProjectChange(idx, "description", e.target.value)
              }
              placeholder="Description"
              className="border p-2 rounded w-full mb-2"
            />
            <input
              value={proj.tech.join(", ")}
              onChange={(e) => handleProjectChange(idx, "tech", e.target.value)}
              placeholder="Technologies (comma separated)"
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
        <button
          onClick={addProject}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add More
        </button>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Certifications</h3>
        {resume.certifications.map((cert, idx) => (
          <input
            key={idx}
            value={cert}
            onChange={(e) => handleCertificationsChange(idx, e.target.value)}
            placeholder="Certification"
            className="border p-2 rounded w-full mb-2"
          />
        ))}
        <button
          onClick={addCertification}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add More
        </button>
      </div>

      {/* Hobbies */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Hobbies</h3>
        {resume.hobbies.map((hobby, idx) => (
          <input
            key={idx}
            value={hobby}
            onChange={(e) => handleHobbiesChange(idx, e.target.value)}
            placeholder="Hobby"
            className="border p-2 rounded w-full mb-2"
          />
        ))}
        <button
          onClick={addHobby}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add More
        </button>
      </div>
      <button
          onClick={Handlenavigate}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Generate Resume
        </button>
    </div>
  );
};

export default ResumeForm;
