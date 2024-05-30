import React, { useState } from 'react';
import UploadData from './components/UploadData';
import DataInput from './components/DataInput';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [uvData, setUvData] = useState({ index: 0, category: '', advice: '' });
  const [selections, setSelections] = useState({
    head: 'None',
    chest: 'None',
    arms: 'None',
    legs: 'None',
    feet: 'None'
  });
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (uploadedFile) => {
    // Example parsing logic (adapt based on actual file format and content)
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const uvIndexExtracted = parseFloat(content); // Example extraction logic
      setUvData({
        index: uvIndexExtracted,
        category: determineUvCategory(uvIndexExtracted),
        advice: determineUvAdvice(uvIndexExtracted)
      });
    };
    reader.readAsText(uploadedFile);
  };

  const handleUvDataReceived = (data) => {
    setUvData(data);
  };
  

  const handleSelectionChange = (bodyPart, level) => {
    setSelections(prev => ({ ...prev, [bodyPart]: level }));
  };

  const handleDone = () => {
    calculateRisk();
    setShowResults(true);
  };

  const determineUvCategory = (index) => {
    // Define UV index categories
    if (index <= 2) return 'Low';
    if (index <= 5) return 'Moderate';
    if (index <= 7) return 'High';
    if (index <= 10) return 'Very High';
    return 'Extreme';
  };

  const determineUvAdvice = (index) => {
    // Advice based on UV index
    if (index > 7) {
      return 'Wear sunscreen, avoid midday sun.';
    }
    return 'Use protective clothing and sunglasses.';
  };

  const calculateRisk = () => {
    let newResults = {};
    Object.keys(selections).forEach(part => {
      const protectionLevel = selections[part];
      newResults[part] = determineRiskFromClothing(uvData.index, protectionLevel, part);
    });
    setResults(newResults);
  };

  const riskData = {
    head: {
      brimmedHat: ["safe", "Low risk", "Moderate risk", "Moderate risk", "High risk"],
      baseballCap: ["Low risk", "Moderate risk", "Moderate risk", "High risk", "High risk"],
      bucketHat: ["Low risk", "Moderate risk", "Moderate risk", "High risk", "High risk"],
      beanie: ["low risk", "Moderate risk", "Moderate risk", "High risk", "High risk"],
      ascotHat: ["Low risk", "Moderate risk", "Moderate risk", "High risk", "High risk"],
      none: ["High risk", "High risk", "High risk", "High risk", "Extreme risk"] // Example, adjust based on actual risk assessment
    },
    chest: {
      tshirt: ["safe", "Moderate risk", "Moderate risk", "High risk", "High risk"],
      longsleeve: ["safe", "low risk", "low risk", "Moderate risk", "High risk"],
      uvshirt: ["safe", "safe", "safe", "safe", "safe"],
      swimshirt: ["Low risk", "Moderate risk", "Moderate risk", "High risk", "High risk"],
      none: ["High risk", "High risk", "High risk", "High risk", "High risk"]
    },
    arms: {
      sleeves: ["safe", "low risk", "low risk", "Moderate risk", "High risk"],
      sunscreen: ["safe", "safe", "safe", "Moderate risk", "Moderate risk"],
      none: ["High risk", "High risk", "High risk", "High risk", "High risk"],
      glove: ["safe", "low risk", "low risk", "Moderate risk", "High risk"]
    },
    legs: {
      pants: ["safe", "low risk", "low risk", "Moderate risk", "High risk"],
      shorts: ["safe", "low risk", "low risk", "Moderate risk", "High risk"],
      uvPants: ["safe", "safe", "safe", "safe", "safe"],
      none: ["High risk", "High risk", "High risk", "High risk", "High risk"]
    },
    feet: {
      shoes: ["safe", "low risk", "low risk", "Moderate risk", "High risk"],
      sandals: ["safe", "low risk", "low risk", "Moderate risk", "High risk"],
      socks: ["safe", "low risk", "low risk", "Moderate risk", "High risk"],
      none: ["High risk", "High risk", "High risk", "High risk", "High risk"]
    }
  };
  
  const indexRanges = [2, 5, 7, 10, 11]; // Corresponds to your UV index ranges
  
  const determineRiskFromClothing = (uvIndex, protectionLevel, bodyPart) => {
    // Handle default selection 'None' or any other unhandled protection level
    if (protectionLevel === 'None' || !riskData[bodyPart] || !riskData[bodyPart][protectionLevel]) {
      console.warn('No risk data available for:', {uvIndex, protectionLevel, bodyPart});
      return 'No protection - High risk';
    }
  
    // Determine which UV index range the current index falls into
    const rangeIndex = indexRanges.findIndex(range => uvIndex <= range);
  
    // Defensive programming: check if the rangeIndex was found correctly
    if (rangeIndex === -1) {
      console.error('UV index range not found for index:', uvIndex);
      return 'Risk data unavailable';
    }
  
    // Get the risk data based on the body part and protection level
    const protectionRisks = riskData[bodyPart][protectionLevel];
  
    // Return the specific risk level for the UV index range
    return protectionRisks[rangeIndex] || 'Risk data unavailable';
  };
  

  
  
  
  
  return (
    <div>
      <div className='title-container'>
        <div className="title-box">
          <h1 className='title-text'>UV ASSISTANCE MUSE INVENTORY</h1>
        </div>
      </div>

      <div className="main-container">
      <div className="UploadData">
        <div className="title-box">
          <h1 className='title-text'>1. Upload Your UV data</h1>
        </div>
        <UploadData onFileUpload={handleFileUpload} onUvDataReceived={handleUvDataReceived} />
      </div>
        
        <div className='DataInput'>
          <div className="title-box">
            <h1 className='title-text'>2. Select Your Dressing</h1>
          </div>
          <DataInput onSelectionChange={handleSelectionChange} onDone={handleDone} />
        </div>

        {showResults && (
          <div className='ResultDisplay'>
            <div className="title-box">
              <h1 className='title-text'>3. View Your Result</h1>
            </div>
            <ResultDisplay results={results} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
