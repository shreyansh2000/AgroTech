import React, { useState } from "react";
import axios from "axios";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { useAuth } from '../../contexts/authContext';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";




export default function UploadImageModal() {
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [linkToDiseaseInfo, setLinkToDiseaseInfo] = useState("");

  const handleRedirect = (diseasePrediction) => {
    navigate(`/informationhub?search=${encodeURIComponent(diseasePrediction)}`); // Redirect to the Information Hub page with the search query
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  function getSeverityAndMessage(prediction) {
    let severity = "success";
    let message = "Leaf is healthy";

    if (prediction) {
      if (
        prediction.includes("Bacterial Spot") ||
        prediction.includes("Early Blight") ||
        prediction.includes("Late Blight") ||
        prediction.includes("Target Spot") ||
        prediction.includes("Yellow Leaf Curl Virus")
      ) {
        severity = "error";
        message = "Leaf is affected by disease";
      } else if (
        prediction.includes("Leaf Mold") ||
        prediction.includes("Septoria Leaf Spot") ||
        prediction.includes("Mosaic Virus") ||
        prediction.includes("Spider Mites")
      ) {
        severity = "warning";
        message = "Leaf may have some issues";
      }
    }

    return { severity, message };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "https://tcdi-flask-app.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (auth.currentUser && !auth.currentUser.isAnonymous) {
        const userDocRef = doc(db, "results", auth.currentUser.uid);
        await addDoc(collection(userDocRef, "data"), {
          imageUri: imagePreview,
          prediction: response.data.prediction,
          confidence: response.data.confidence,
          timestamp: serverTimestamp()
        });
      }

      const predictionData = response.data.prediction 
      const PredictionConfidence=response.data.confidence;
      setPrediction(predictionData+" with confidence of "+PredictionConfidence);

      if (!predictionData.toLowerCase().includes("healthy")) {
        const diseaseName = response.data.prediction;
        setLinkToDiseaseInfo(
          `/informationhub?search=${encodeURIComponent(diseaseName)}`
        );
      } else {
        setLinkToDiseaseInfo(""); // Reset link to empty if the leaf is healthy
      }
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("An error occurred while making the prediction.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setImagePreview(null);
    setPrediction(null);
    setError(null);
  };

  return (
    <>
      <button
        className="bg-green-500 text-white font-bold uppercase py-3 px-6 rounded shadow hover:shadow-lg"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Upload Image
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[800px] h-[550px] bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Upload an Image</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto flex items-center justify-center">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center"
                    style={{ width: "100%" }}
                  >
                    {/* Input for selecting image */}
                    {/* <input type="file" accept="image/*" className="text-xl mt-8" onChange={handleFileChange} style={{ width: '100%',  padding: '10px', border: '1px solid grey', borderRadius: '5px', marginBottom: '10px' }} />
                     */}
                    <div style={{ textAlign: "center" }}>
                      <input
                        type="file"
                        accept="image/*"
                        className="text-xl mt-8"
                        onChange={handleFileChange}
                        style={{
                          display: "inline-block",
                          width: "100%",
                          padding: "10px",
                          border: "1px solid grey",
                          borderRadius: "5px",
                          marginBottom: "10px",
                          textAlign: "center",
                        }}
                      />
                    </div>

                    {/* Image preview */}
                    <div
                      className="flex justify-between"
                      style={{ width: "100%" }}
                    >
                      <Box
                        height={220}
                        width={300}
                        my={4}
                        display="flex"
                        alignItems="center"
                        justifyContent="center" // Center the content horizontally
                        gap={4}
                        p={2}
                        sx={{ border: "2px solid grey" }}
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-full max-h-300"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        ) : (
                          <div className="text-2xl">
                            Upload an image to get started
                          </div>
                        )}
                      </Box>
                      {/* Display prediction */}
                      <Box
                        height={220}
                        width={300}
                        my={4}
                        display="flex"
                        flexDirection="column" // Align items vertically
                        alignItems="center"
                        justifyContent="center"
                        gap={4}
                        p={2}
                        sx={{ border: "2px solid grey" }}
                      >
                        {/* Conditionally render loading indicator */}
                        {loading ? (
                          <CircularProgress />
                        ) : (
                          <>
                            {/* Show prediction when available */}
                            {prediction && (
                              <div className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              >
                                {console.log(prediction)}
                                Diseases: {prediction} 
                              </div>
                            )}

                            
                            {/* Conditionally render link to disease info */}
                            
                            {prediction  &&
                              !prediction.toLowerCase().includes("healthy") &&
                              linkToDiseaseInfo && (
                                <a
                                  href={linkToDiseaseInfo}
                                  className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                  Learn more about this disease
                                </a>
                              )}
                          </>
                        )}
                      </Box>
                    </div>
                  </form>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {imagePreview && prediction && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      {prediction && (
                        <Alert
                          style={{
                            width: "100%",
                            fontSize: "16px",
                            padding: "10px",
                          }}
                          severity={getSeverityAndMessage(prediction).severity}
                        >
                          {getSeverityAndMessage(prediction).message}
                        </Alert>
                      )}
                    </Stack>
                  )}

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false) || handleCloseModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit} // Call handleSubmit for the Predict button
                  >
                    Predict
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
