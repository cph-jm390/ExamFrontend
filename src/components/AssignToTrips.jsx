import React, { useEffect, useState } from 'react';

const AssignToTrips = ({user}) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    console.log({user});
    fetch("http://localhost:8080/exam/api/trips/all")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setTrips(data);
      })
      .catch(error => console.error('Error fetching trips:', error));
        
  }, []);

  const handleButtonClick = (tripId) => {
    // Send data back to the backend
    const requestBody = {
      tripId,
      username: user.username
    };
  
    fetch("http://localhost:8080/exam/api/trips/assign", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // Handle the response from the backend if needed
      })
      .catch(error =>
        console.error("Error sending data to the backend:", error)
      );
  };

  return (
    <div>
      {trips.map(trip => (
        <div key={trip.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p>{trip.trip_name}</p>
          <p>ID:?{trip.id}</p>
          <p>Date: {trip.date}</p>
          <p>Time: {trip.time}</p>
          <p>Location: {trip.location}</p>
          <p>Duration: {trip.duration}</p>
          <p>Packing List: {trip.packingList}</p>
          <p>Guide Name: {trip.guide_name}</p>
          <button onClick={() => handleButtonClick(trip.id)}>Send Data to Backend</button>
        </div>
      ))}
    </div>
  );
};

export default AssignToTrips;
