import React, { useState } from 'react';
import UploadData from './components/UploadData';
import DataInput from './components/DataInput';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState({});

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    // Process file or pass to backend
  };

  const handleSelectionChange = (bodyPart, risk) => {
    setResults(prevResults => ({ ...prevResults, [bodyPart]: risk }));
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
          <h1 className='title-text'>1. Upload Your Data</h1>
        </div>
          <UploadData onFileUpload={handleFileUpload} />
      </div>
      
      <div className='DataInput'>
        <div className="title-box">
          <h1 className='title-text'>2. Input Your Data</h1>
        </div>
          <DataInput onSelectionChange={handleSelectionChange} />

      </div>


      <div className='ResultDisplay'>
        <div className="title-box">
          <h1 className='title-text'>3. View Your Result</h1>
        </div>
          <ResultDisplay results={results} />
      </div>
    
  </div>
  
</div>
  );
  
}

export default App;
