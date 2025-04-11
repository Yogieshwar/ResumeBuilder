// src/components/FontAndColorControls.jsx
import React from "react";
// import "./FontAndColorControls.css"; // Optional: to style controls if needed

const FontAndColorControls = ({ fontStyle, setFontStyle, color, setColor }) => {
  return (
    <div className="controls">
      <label>
        Font Style:
        <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </label>

      <label>
        Font Color:
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
    </div>
  );
};

export default FontAndColorControls;
