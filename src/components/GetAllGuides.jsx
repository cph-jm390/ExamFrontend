import React, { useEffect, useState } from 'react';


const GetAllGuides = () => {
    const [guides, setGuides] = useState([]);
  
    useEffect(() => {
      // Fetch data from the backend
      fetch("http://localhost:8080/exam/api/guides/all")
        .then(response => response.json())
        .then(data => setGuides(data))
        .catch(error => console.error('Error fetching guides:', error));
        
    }, []);
  
    return (
      <div>
        <h1>All Guides</h1>
        <ul>
          {guides.map((guide, index) => (
            <li key={index}>{guide}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default GetAllGuides;