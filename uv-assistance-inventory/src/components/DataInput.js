import React, { useState } from 'react';
import BodyDiagram from '../assets/body_diagram.png'; // Ensure this path is correct

function DataInput({ onDone }) { // Make sure onDone is included here
  const [protection, setProtection] = useState({
    head: '',
    chest: '',
    arms: '',
    legs: '',
    feet: ''
  });

  // Handler for changing clothing protection
  const handleClothingChange = (part, value) => {
    setProtection(prev => ({ ...prev, [part]: value }));
  };

  return (
    <div className="data-input-container">
      <div className="body-container">
        <img src={BodyDiagram} alt="Body Diagram" className="body-diagram" />

        {/* Selector for head */}
        <div className="selector" style={{ top: '10%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('head', e.target.value)}>
            <option value="">Select Head Protection</option>
            <option value="brimmedHat">Brimmed Hat</option>
            <option value="baseballCap">Baseball Cap</option>
            <option value="bucketHat">Bucket Hat</option>
            <option value="beanie">Beanie</option>
            <option value="ascotHat">Ascot Hat</option>
          </select>
        </div>

        {/* Selector for chest */}
        <div className="selector" style={{ top: '30%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('chest', e.target.value)}>
            <option value="">Select Chest Protection</option>
            <option value="tshirt">T-Shirt</option>
            <option value="longsleeve">Long-Sleeve Shirt</option>
            <option value="uvshirt">UV-Protective Shirt</option>
            <option value="swimshirt">Swim Shirt/Rash Guard</option>
            <option value="none">No Shirt</option>
          </select>
        </div>

        {/* Selector for right arm */}
        <div className="selector" style={{ top: '45%', right: '30%' }}>
          <select onChange={(e) => handleClothingChange('arms', e.target.value)}>
            <option value="">Select Arm Protection</option>
            <option value="sleeves">Long Sleeves</option>
            <option value="sunscreen">Sunscreen Applied</option>
            <option value="none">No Protection</option>
          </select>
        </div>

        {/* Selector for legs */}
        <div className="selector" style={{ top: '60%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('legs', e.target.value)}>
            <option value="">Select Leg Protection</option>
            <option value="pants">Pants</option>
            <option value="shorts">Shorts</option>
            <option value="uvPants">UV Protective Pants</option>
            <option value="none">No Protection</option>
          </select>
        </div>

        {/* Selector for feet */}
        <div className="selector" style={{ bottom: '10%', left: '50%' }}>
          <select onChange={(e) => handleClothingChange('feet', e.target.value)}>
            <option value="">Select Feet Protection</option>
            <option value="shoes">Shoes</option>
            <option value="sandals">Sandals</option>
            <option value="socks">Socks</option>
            <option value="none">Barefoot</option>
          </select>
        </div>
        
        {/* Done button to finalize the selections */}
        <button onClick={onDone} className="done-button">Done</button>
    
      </div>
      
    </div>
  );
}

export default DataInput;
