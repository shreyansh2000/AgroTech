import React, { useState } from 'react';

const CameraComponent = () => {
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setInputData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handlePrediction = async () => {
    try {
      const response = await fetch('https://tcdi-flask-app.onrender.com/predict',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({ input_data: inputData }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };
  

  return (
    <div className='flex items-center justify-center h-screen'>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Paste image URL or upload an image"
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handlePrediction}>Predict</button>

      {prediction !== null && (
        <div>
          <h3>Prediction:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default CameraComponent
