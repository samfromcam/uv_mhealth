import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function UploadData(props) { // Include props here to use them in the component
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileUploaded, setFileUploaded] = useState(false);
    const [averageReading, setAverageReading] = useState('');
    const [uvIndexRange, setUvIndexRange] = useState('');
    const [uvIndexInfo, setUvIndexInfo] = useState({});

    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (event) => {
            setFileContent(event.target.result);
            setFileUploaded(true);
        };

        reader.readAsText(file);
    };

    const getUvIndexCategory = (uvIndex) => {
        if (uvIndex <= 2) {
            return {
                category: 'Low',
                color: 'Green',
                advice: "Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure."
            };
        } else if (uvIndex <= 5) {
            return {
                category: 'Moderate',
                color: 'Yellow',
                advice: 'Stay in shade near midday when the sun is strongest. If outdoors, wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating. Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.'
            };
        } else if (uvIndex <= 7) {
            return {
                category: 'High',
                color: 'Orange',
                advice: 'Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating.  Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.'
            };
        } else if (uvIndex <= 10) {
            return {
                category: 'Very High',
                color: 'Red',
                advice: 'Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating. Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.'
            };
        } else {
            return {
                category: 'Extreme',
                color: 'Purple',
                advice: 'Try to avoid sun exposure between 10 a.m. and 4 p.m. Seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.'
            };
        }
    };

    const handleAnalyze = () => {
        const readings = fileContent.split(/\r\n|\n/).map(Number);
        const validReadings = readings.filter(num => !isNaN(num));
        const average = validReadings.reduce((a, b) => a + b, 0) / validReadings.length;
        const uvIndex = (Math.sqrt(average) - Math.sqrt(Math.sqrt(average))).toFixed(2);

        setAverageReading(average.toFixed(2));
        setUvIndexRange(uvIndex);

        const uvInfo = getUvIndexCategory(parseFloat(uvIndex));
        setUvIndexInfo(uvInfo);

        // Pass UV data up to the parent component if function is available
        if (props.onUvDataReceived) {
            props.onUvDataReceived({
                index: parseFloat(uvIndex),
                category: uvInfo.category,
                advice: uvInfo.advice
            });
        }

        setFileContent(''); // Optionally clear the file content
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        accept: '.txt, .csv'
    });

    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {isDragActive ? 
                    <p>Drop the file here...</p> :
                    <p>Drag 'n' drop a file here, or click to select a file</p>
                }
                {!fileUploaded && <button className="upload-button">Upload</button>}
            </div>
            {fileUploaded && 
                <button className="analyze-button" onClick={handleAnalyze}>Analyze</button>
            }
            {fileName && <div className="file-info">
                <strong>Filename:</strong> {fileName}
            </div>}
            {averageReading && <div className="analysis-results">
                <strong>Average Reading from the Sensor:</strong> {averageReading}
                <br/>
                <strong>UV Index range from the Sensor:</strong> {uvIndexRange}
            </div>}
            {uvIndexInfo.category && (
                <div 
                    className="analysis-results"
                    style={{ backgroundColor: uvIndexInfo.color.toLowerCase() }}
                >
                    <strong>UV Index:</strong> {uvIndexRange} ({uvIndexInfo.color})
                    <p><strong>Category:</strong> {uvIndexInfo.category}</p>
                    <p><strong>Advice:</strong> {uvIndexInfo.advice}</p>
                </div>
            )}
        </div>
    );
}

export default UploadData;
