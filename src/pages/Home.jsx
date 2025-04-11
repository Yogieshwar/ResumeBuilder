import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";


const Home = () => {
  const navigate = useNavigate();

  
  const username = useSelector((state) => state.auth.user);
  console.log(username)


  const handleGetStarted = () => {
    navigate("/resumeform");
  };

  return (
    <div className="home-container relative min-h-screen bg">
      <Logout/>
      <div className="welcome-card">
        <h1>Welcome, {username}!</h1>
        <p>Ready to build your professional resume?</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default Home;
