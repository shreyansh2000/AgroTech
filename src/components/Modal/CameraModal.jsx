import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

export default function CameraModal() {
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef(null);
  const [linkToDiseaseInfo, setLinkToDiseaseInfo] = useState("");
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("Leaf is healthy");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setImageSrc(canvas.toDataURL("image/png"));
    stopCamera();
  };

  const handleSubmit = async () => {
    try {
      const blob = await fetch(imageSrc).then((r) => r.blob());
      const file = new File([blob], "photo.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("image", file);

      const result = await axios.post(
        "https://tcdi-flask-app.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(result.data.prediction+" with confidence of "+result.data.confidence);

      // Create a link if the prediction is a disease and not 'Healthy'
      if (result.data.prediction.toLowerCase() !== "healthy") {
        setLinkToDiseaseInfo(
          `/informationhub?search=${encodeURIComponent(result.data.prediction)}`
        );
        setSeverity("error");
        setMessage("Leaf is affected by disease");
      } else {
        setLinkToDiseaseInfo(""); // Reset link to empty if the prediction is 'Healthy'
        setSeverity("success");
        setMessage("Leaf is healthy");
      }
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setImageSrc(null);
    setPrediction(null);
    setSeverity("success");
    setMessage("Leaf is healthy");
    stopCamera();
  };

  const retakePhoto = () => {
    setImageSrc(null);
    setPrediction(null);
    setSeverity("success");
    setMessage("Leaf is healthy");
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
      <button
        className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg"
        onClick={() => setShowModal(true)}
      >
        Open Camera
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-8 relative text-center">
            
            {imageSrc ? (
              <div className="p-4">
                <img className="w-full" src={imageSrc} alt="Snapshot" />
                <button
                  className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mx-1 my-3"
                  onClick={retakePhoto}
                >
                  Retake Photo
                </button>
                {prediction && (
                  <div className="flex flex-wrap justify-center items-center">
                    <p className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mx-1 my-3">
                     {prediction}
                    </p>
                    {!prediction.toLowerCase().includes("healthy") &&
                      linkToDiseaseInfo && (
                        <a
                          href={linkToDiseaseInfo}
                          className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mx-1 my-3">
                        
                          Learn more about this Diseases
                        </a>
                      )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                <video ref={videoRef} autoPlay className="w-full"></video>
                <button
                  className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mt-4"
                  onClick={takePhoto}
                >
                  Take Photo
                </button>
              </div>
            )}
            {/* Footer from UploadImageModal */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              {prediction && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert
                    style={{
                      width: "100%",
                      fontSize: "16px",
                      padding: "10px",
                    }}
                    severity={severity}
                  >
                    {message}
                  </Alert>
                </Stack>
              )}

              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                  className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg mx-1 my-3"
                  onClick={handleSubmit}
                >
                  Predict
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

