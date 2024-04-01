import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function CameraModal() {
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef(null);
  const [linkToDiseaseInfo, setLinkToDiseaseInfo] = useState('');


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setImageSrc(canvas.toDataURL('image/png'));
    stopCamera();
  };

  const handleSubmit = async () => {
    try {
      const blob = await fetch(imageSrc).then(r => r.blob());
      const file = new File([blob], "photo.png", { type: "image/png" });
      const formData = new FormData();
      formData.append('image', file);
  
      const result = await axios.post('https://tcdi-flask-app.onrender.com/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(result.data.prediction);
  
      // Create a link if the prediction is a disease and not 'Healthy'
      if (result.data.prediction.toLowerCase() !== 'healthy') {
        setLinkToDiseaseInfo(`/informationhub?search=${encodeURIComponent(result.data.prediction)}`);
      } else {
        setLinkToDiseaseInfo(''); // Reset link to empty if the prediction is 'Healthy'
      }
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
    setImageSrc(null);
    setPrediction(null);
    stopCamera();
  };

  const retakePhoto = () => {
    setImageSrc(null);
    setPrediction(null);
    startCamera();
  };

  useEffect(() => {
    if (showModal) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [showModal]);

  return (
    <>
      <button className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg" onClick={() => setShowModal(true)}>
        Open Camera
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-8 relative text-center">
         
            <span className="absolute top-0 right-0 text-3xl font-bold cursor-pointer" onClick={closeModal}>&times;</span>
            {imageSrc ? (
              <div className="p-4" >
                <img className="w-full" src={imageSrc} alt="Snapshot" />
                <button className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mx-1 my-3" onClick={retakePhoto}>Retake Photo</button>
                <button className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mx-1 my-3" onClick={handleSubmit}>Predict</button>
                {prediction && <p className="mt-4">Prediction: {prediction}</p>}
                {prediction && !prediction.toLowerCase().includes('healthy') && linkToDiseaseInfo && (
  <a href={linkToDiseaseInfo} className="text-blue-600 hover:text-blue-800 underline mt-4">
    Learn more about {prediction}
  </a>
)}
              </div>
            ) : (
              <div className="p-4">
                <video ref={videoRef} autoPlay className="w-full"></video>
                <button className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mt-4" onClick={takePhoto}>Take Photo</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
