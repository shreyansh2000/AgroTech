// import React from 'react'
// import data from '../InformationHub/InformationHubData.json'
// import "../InformationHub/InformationHub.css"


// function DiseaseList() {

//   return (
//     <>
//     <div className='flex items-center justify-center h-screen'>
//     <header>
//         <h1>Disease Information Hub</h1>
//         <p>Welcome to the Disease Information Hub. Here you can find details on various plant diseases along with prevention and treatment methods.</p>
//         <p></p>
//         <p><b>Here's some information about the Tomato crop:</b>
//             <br/>Tomato plants are tender, warm-season crops that love the sun and cannot bear frost. It’s important not to put plants in the ground too early. In most regions, the soil is not warm enough to plant tomatoes outdoors until late spring and early summer, except in zone 10, where they are a fall and winter crop.
//         Tomatoes take 60 days to more than 100 days to harvest, depending on the variety. Due to their relatively long growing season requirements (and late planting date), most gardeners plant small “starter plants” or transplants instead of seeds after the weather has warmed up in spring. Many gardeners purchase their transplants at a garden center or nursery, but you can certainly grow your own from seed indoors. </p>
//         <p><b>When to Plant Tomatoes:</b>
//            <br/> Tomatoes are long-season, heat-loving plants that won’t tolerate frost, so wait until the weather has warmed up in the spring. See our Planting Calendar for when to start tomatoes in your location.
//             If you are starting tomatoes from seed, sow indoors six weeks before the last expected spring frost date in your area. Sow seeds 1/2-inch deep in small trays. Plant seedlings outdoors about two weeks after that date or when temperatures stay in the mid-50 degree range both day and night.
//             If you have a long enough growing season, it is also possible to direct-seed tomatoes in the garden soil (1/2-inch deep)—but not before the soil is at least 55°F. Note that 70°F soil is optimum for maximum germination within five days. 
//         </p>
//         <p><b>How to plant the tomato crop:</b>
//             <br/>Select a site with full sun! In northern regions, 8 to 10 hours of direct sunlight are preferred. In southern regions, light afternoon shade (natural or applied, e.g., row covers) will help tomatoes to survive and thrive. Dig the soil to about 1 foot deep and mix in aged manure and/or compost. Give it two weeks to break down before planting. Also, choose a space where tomatoes (and members of their family, especially eggplants, peppers, and potatoes) have not grown in the previous couple of years.</p>
        
//         <input type="text" id="search-bar" placeholder="Search for any disease..."/>
//     </header>
//         <section>
//             <div className='container'>
//                 {
//                 data.map(post => {
//                     return (
//                         <div className='card'>
//                             <h3>{post.name}</h3>
//                         </div>
//                     )
//                 })
//                 }
//             </div>
//         </section>
//         </div>
//     </>
//   )
// }

// export default DiseaseList

import React, { useState, useEffect } from 'react';
import DiseaseCard from './DiseaseCard'
import SearchBar from './SearchBar';
import './InformationHub.css';
function InformationHub() {
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    // Assume you're fetching from a static file hosted with your React app
    fetch('/tomato_diseases.json')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by 'name'
        setDiseases(data);
        setFilteredDiseases(data);
      })
      .catch((error) => console.error('Error fetching diseases:', error));
  }, []);

  const handleSearch = (searchText) => {
    const filtered = diseases
      .filter((disease) =>
        disease.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by 'name'
  
    setFilteredDiseases(filtered);
  };

  const calculateCardsPerRow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1000) {
      return 3;
    } else if (screenWidth > 600) {
      return 2;
    } else {
      return 1;
    }
  };

  const handleReadMoreClick = (index) => {
    const cardsPerRow = calculateCardsPerRow();
    const rowNumber = Math.floor(index / cardsPerRow);

    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowNumber)) {
      newExpandedRows.delete(rowNumber);
    } else {
      newExpandedRows.add(rowNumber);
    }

    setExpandedRows(newExpandedRows);
  };

  return (
    <>
    <div>
    <div className='flex flex-wrap justify-center'>
     {/* <header>
         <h1>Disease Information Hub</h1>
         <p>Welcome to the Disease Information Hub. Here you can find details on various plant diseases along with prevention and treatment methods.</p>
         <p></p>
         <p><b>Here's some information about the Tomato crop:</b>
             <br/>Tomato plants are tender, warm-season crops that love the sun and cannot bear frost. It’s important not to put plants in the ground too early. In most regions, the soil is not warm enough to plant tomatoes outdoors until late spring and early summer, except in zone 10, where they are a fall and winter crop.
         Tomatoes take 60 days to more than 100 days to harvest, depending on the variety. Due to their relatively long growing season requirements (and late planting date), most gardeners plant small “starter plants” or transplants instead of seeds after the weather has warmed up in spring. Many gardeners purchase their transplants at a garden center or nursery, but you can certainly grow your own from seed indoors. </p>
        <p><b>When to Plant Tomatoes:</b>
            <br/> Tomatoes are long-season, heat-loving plants that won’t tolerate frost, so wait until the weather has warmed up in the spring. See our Planting Calendar for when to start tomatoes in your location.
             If you are starting tomatoes from seed, sow indoors six weeks before the last expected spring frost date in your area. Sow seeds 1/2-inch deep in small trays. Plant seedlings outdoors about two weeks after that date or when temperatures stay in the mid-50 degree range both day and night.
             If you have a long enough growing season, it is also possible to direct-seed tomatoes in the garden soil (1/2-inch deep)—but not before the soil is at least 55°F. Note that 70°F soil is optimum for maximum germination within five days.        </p>
        <p><b>How to plant the tomato crop:</b>
           <br/>Select a site with full sun! In northern regions, 8 to 10 hours of direct sunlight are preferred. In southern regions, light afternoon shade (natural or applied, e.g., row covers) will help tomatoes to survive and thrive. Dig the soil to about 1 foot deep and mix in aged manure and/or compost. Give it two weeks to break down before planting. Also, choose a space where tomatoes (and members of their family, especially eggplants, peppers, and potatoes) have not grown in the previous couple of years.</p>
               
     </header> */}
      <SearchBar onSearch={handleSearch} />
      <div id="disease-container">
        {filteredDiseases.map((disease, index) => (
          <DiseaseCard
            key={index}
            disease={disease}
            isExpanded={expandedRows.has(Math.floor(index / calculateCardsPerRow()))}
            onReadMoreClick={() => handleReadMoreClick(index)}
          />
        ))}
      </div>
    </div>
    </div>
    </>
  );
}

export default InformationHub;
