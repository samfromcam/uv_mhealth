import React from 'react';

function ResultDisplay({ results }) {
  return (
    <div className='results-container'>
      <h2>Results</h2>
      {Object.entries(results).map(([bodyPart, risk]) => (
        <p key={bodyPart}>{`${bodyPart}: ${risk} Risk`}</p>
      ))}
    </div>
  );
}

export default ResultDisplay;
