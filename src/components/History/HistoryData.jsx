import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { useAuth } from '../../contexts/authContext';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from "react-router-dom";

function HistoryData() {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);



  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'imageUri', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value} alt="image" /> },
    { field: 'prediction', headerName: 'Prediction', width: 150 },
    { field: 'confidence', headerName: 'Confidence', width: 150 },
    {
      field: 'predictionType',
      headerName: 'Prediction Type',
      width: 200,
      renderCell: (params) => (
        <span
        style={{
          backgroundColor:
            params.row.prediction === 'Bacterial Spot' ||
            params.row.prediction === 'Early Blight' ||
            params.row.prediction === 'Late Blight' ||
            params.row.prediction === 'Target Spot' ||
            params.row.prediction === 'Yellow Leaf Curl Virus'
              ? 'red'
              : params.row.prediction === 'Leaf Mold' ||
                params.row.prediction === 'Septoria Leaf Spot' ||
                params.row.prediction === 'Mosaic Virus' ||
                params.row.prediction === 'Spider Mites'
              ? 'yellow'
              : 'green',
          color: 'white',
          padding: '5px',
          borderRadius: '5px'
        }}
      >
        {params.value}
      </span>
      
      ),
    },
  ];
  
  const augmentedHistory = history.map((item, index) => {
    // console.log(item.prediction=='Early Blight' ? 'red' : 'green');
    return { ...item, id: index };
  });

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const fetchData = async () => {
      const userDocRef = doc(db, "results", auth.currentUser.uid);
      const querySnapshot = await getDocs(collection(userDocRef, "data"));
      const historyData = [];
      querySnapshot.forEach((doc) => {
        historyData.push(doc.data());
      });
      setHistory(historyData);
    };

    fetchData();
  }, []);

  return (
    <main className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center' style={{maxWidth:'40%'}}>
        <h1 className='text-4xl font-bold mb-4'>History</h1>
      </div>
      {currentUser ? (
        <div className='text-4xl font-bold mb-4' style={{ height: 500, width: 1200 , margin: 'auto', marginTop: '20px', marginBottom: '20px', padding: '20px',font: '16px Jost, sans-serif'}}>
          <DataGrid
          style={{ width: '100%', height: '100%' ,fontSize: '16px', padding: '8px'}}
          rows={augmentedHistory}
          columns={columns}
         pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        components={{
       // Customizing the cell renderer
       Cell: ({ value }) => (
      <div style={{ fontSize: '16px', padding: '8px' }}>
        {value}
      </div>
    ),
  }}
  // Customizing the row height
   rowHeight={80}
  // Customizing the header row height
  headerHeight={80}
  // Adding spacing between rows
  rowSpacing={20}
/>

        </div>
      ) : (
        <div className='text-4xl font-bold mb-4'>
        <p>Please logIn/Register to view history data.</p>
        {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"

        >
        Login/Register
       </button> */}
        </div>
      )}
    </main>
  );
}

export default HistoryData;
