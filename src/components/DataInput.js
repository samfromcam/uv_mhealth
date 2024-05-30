import React, { useState } from 'react';
import BodyDiagram from '../assets/body_diagram.png'; // Ensure this path is correct

function DataInput({ onSelectionChange, onDone }) {
  // Initialize the protection state with non-empty default values if needed
  const [protection, setProtection] = useState({
    head: 'None',
    chest: 'None',
    arms: 'None',
    legs: 'None',
    feet: 'None'
  });

  // Handler for changing clothing protection
  const handleClothingChange = (part, value) => {
    setProtection(prev => ({ ...prev, [part]: value }));
    onSelectionChange(part, value);
  };

  return (
    <div className="data-input-container">
      <div className="body-container">
        <img src={BodyDiagram} alt="Body Diagram" className="body-diagram" />

        {/* Selector for head */}
        <div className="selector" style={{ top: '10%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('head', e.target.value)} value={protection.head}>
            <option value="None">Select Head Protection</option>
            <option value="brimmedHat">Brimmed Hat</option>
            <option value="baseballCap">Baseball Cap</option>
            <option value="bucketHat">Bucket Hat</option>
            <option value="beanie">Beanie</option>
            <option value="ascotHat">Ascot Hat</option>
            <option value="none">No Hat</option>
          </select>
        </div>

        {/* Selector for chest */}
        <div className="selector" style={{ top: '30%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('chest', e.target.value)} value={protection.chest}>
            <option value="None">Select Chest Protection</option>
            <option value="tshirt">T-Shirt</option>
            <option value="longsleeve">Long-Sleeve Shirt</option>
            <option value="uvshirt">UV-Protective Shirt</option>
            <option value="swimshirt">Swim Shirt/Rash Guard</option>
            <option value="none">No Shirt</option>
          </select>
        </div>

        {/* Selector for right arm */}
        <div className="selector" style={{ top: '45%', right: '30%' }}>
          <select onChange={(e) => handleClothingChange('arms', e.target.value)} value={protection.arms}>
            <option value="None">Select Arm Protection</option>
            <option value="sleeves">Long Sleeves</option>
            <option value="sunscreen">Sunscreen Applied</option>
            <option value="none">No Protection</option>
          </select>
        </div>

        {/* Selector for legs */}
        <div className="selector" style={{ top: '60%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('legs', e.target.value)} value={protection.legs}>
            <option value="None">Select Leg Protection</option>
            <option value="pants">Pants</option>
            <option value="shorts">Shorts</option>
            <option value="uvPants">UV Protective Pants</option>
            <option value="none">No Protection</option>
          </select>
        </div>

        {/* Selector for feet */}
        <div className="selector" style={{ bottom: '10%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('feet', e.target.value)} value={protection.feet}>
            <option value="None">Select Feet Protection</option>
            <option value="shoes">Shoes</option>
            <option value="sandals">Sandals</option>
            <option value="socks">Socks</option>
            <option value="none">Barefoot</option>
          </select>
        </div>
        
        {/* Done button to finalize the selections */}
        <button onClick={() => onDone(protection)} className="done-button">Done</button>
      </div>
    </div>
  );
}

export default DataInput;
