import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: "",
    linkedinUrl: "",
  },
  summary: "",
  skills: [""],
  education: [
    {
      school: "",
      degree: "",
      year: "",
    },
  ],
  experience: [
    {
      company: "",
      role: "",
      year: "",
      description: "",
    },
  ],
  projects: [
    {
      title: "",
      description: "",
      tech: [""],
    },
  ],
  certifications: [""],
  hobbies: [""],
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    updateSummary: (state, action) => {
      state.summary = action.payload;
    },
    updateSkills: (state, action) => {
      state.skills = action.payload;
    },
    updateEducation: (state, action) => {
      state.education = action.payload;
    },
    updateExperience: (state, action) => {
      state.experience = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateCertifications: (state, action) => {
      state.certifications = action.payload;
    },
    updateHobbies: (state, action) => {
      state.hobbies = action.payload;
    },
    resetResume: () => initialState,
  },
});

export const {
  updatePersonalInfo,
  updateSummary,
  updateSkills,
  updateEducation,
  updateExperience,
  updateProjects,
  updateCertifications,
  updateHobbies,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
