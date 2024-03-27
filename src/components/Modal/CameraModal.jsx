// import React, { useState, useRef, useEffect } from 'react';

// export default function CameraModal() {
//   const [showModal, setShowModal] = useState(false);
//   const [imageSrc, setImageSrc] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Start camera when modal is opened
//   useEffect(() => {
//     if (showModal) {
//       const startCamera = async () => {
//         try {
//           const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//           videoRef.current.srcObject = mediaStream;
//         } catch (err) {
//           console.error('Error accessing the camera', err);
//           alert('Error accessing the camera: ' + err.message);
//           // Handle the error, e.g., show an error message to the user
//         }
//       };
//       startCamera();
//     } else {
//       // Stop camera when modal is closed
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     }
//   }, [showModal]);

//   // Take photo from the video stream
//   const takePhoto = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageDataUrl = canvas.toDataURL('image/png');
//     setImageSrc(imageDataUrl);
//   };

//   return (
//     <>
//       <button
//         className="bg-green-500 text-white active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//         Open Camera
//       </button>
//       {showModal ? (
//         <>
//           <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//             <div className="relative w-auto my-6 mx-auto max-w-3xl">
//               {/* Content */}
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 {/* Header */}
//                 <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//                   <h3 className="text-3xl font-semibold">Camera</h3>
//                   <button
//                     className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
//                       ×
//                     </span>
//                   </button>
//                 </div>
//                 {/* Body */}
//                 <div className="relative p-6 flex-auto">
//                   <video ref={videoRef} className="w-full" autoPlay></video>
//                   <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
//                 </div>
//                 {/* Footer */}
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//                   <button
//                     className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Close
//                   </button>
//                   {imageSrc ? (
//                     <img src={imageSrc} alt="Captured" />
//                   ) : (
//                     <button
//                       className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//                       type="button"
//                       onClick={takePhoto}
//                     >
//                       Take Photo
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';

export default function CameraModal() {
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef(null);
  
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
      <button className="camera-button" onClick={() => setShowModal(true)}>
        Open Camera
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {imageSrc ? (
              <div className="photo-container">
                <img src={imageSrc} alt="Snapshot" />
                <button className="camera-button" onClick={retakePhoto}>Retake Photo</button> 
                 <button className="camera-button" onClick={handleSubmit}>Predict</button>
                {prediction && <p className="prediction-result">Prediction: {prediction}</p>}
              </div>
            ) : (
              <div className="camera-container">
                <video ref={videoRef} autoPlay></video>
                <button
                className="camera-button" onClick={takePhoto}>Take Photo</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

