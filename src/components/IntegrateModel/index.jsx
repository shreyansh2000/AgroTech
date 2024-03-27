import React, { useState } from 'react';
import axios from 'axios';

function YourComponent() {
  const [prediction, setPrediction] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [showModal,setShowModal]=useState(false);



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      // Preview selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('https://tcdi-flask-app.onrender.com/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form onSubmit={handleSubmit}>
        {/* Input for selecting image */}
        <input type="file" accept="image/*" style={{fontSize:'20px'}} onChange={handleFileChange} />
        {/* Image preview */}
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }} />
        )}
        {/* Submit button */}
        <button type="submit" style={{fontSize:'20px', marginTop: '10px'}}>Submit</button>
      </form>
   

    
      
      {/* Display prediction */}
      {prediction && <div style={{fontSize:'20px', marginTop: '10px'}}>Prediction: {prediction}</div>}
    </div>
  );
}

export default YourComponent;

