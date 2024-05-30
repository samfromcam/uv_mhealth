import React from 'react';
import BodyDiagram from '../assets/body_diagram.png';  // Path to your body diagram image

function ResultDisplay({ results }) {
  // CSS positions for each body part risk indicator
  const positions = {
    head: { top: '8%', left: '50%', transform: 'translateX(-50%)' },
    chest: { top: '30%', left: '50%', transform: 'translateX(-50%)' },
    arms: { top: '40%', left: '15%' },  // Position for left arm
    legs: { top: '70%', left: '50%', transform: 'translateX(-50%)' },
    feet: { top: '90%', left: '50%', transform: 'translateX(-50%)' }
  };

  return (
    <div className='results-container' style={{ position: 'relative', width: '300px', margin: 'auto' }}>
      <img src={BodyDiagram} alt="Body Diagram" style={{ width: '100%', height: 'auto' }} />
      {Object.entries(results).map(([bodyPart, risk]) => (
        <div key={bodyPart} className="risk-indicator" style={{ ...positions[bodyPart], position: 'absolute' }}>
          <div style={{
            backgroundColor: risk.includes('High') ? 'red' : 'green',  // Color based on risk level
            color: 'white',
            padding: '5px 10px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            {`${bodyPart}: ${risk}`}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultDisplay;
