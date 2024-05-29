import React from 'react';
import BodyDiagram from '../assets/body_diagram.png'; // Ensure this path is correct

function DataInput() {
  return (
    <div className="data-input-container">
      <div className="body-container">
        <img src={BodyDiagram} alt="Body Diagram" className="body-diagram" />
        <div className="selector" style={{ top: '10%', left: '50%' }}> {/* Example for head */}
          <select>
            <option>Select for Head</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="selector" style={{ top: '30%', left: '50%' }}> {/* Example for chest */}
          <select>
            <option>Select for Chest</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="selector" style={{ top: '45%', right: '30%' }}> {/* Example for right arm */}
          <select>
            <option>Select for Right Arm</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="selector" style={{ top: '60%', left: '50%' }}> {/* Example for legs */}
          <select>
            <option>Select for Legs</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="selector" style={{ bottom: '10%', left: '50%' }}> {/* Example for feet */}
          <select>
            <option>Select for Feet</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DataInput;
