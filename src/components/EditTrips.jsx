import React, { useEffect, useState } from 'react';

const EditTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
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

  const handleEditTrip = (tripId, updatedTripData) => {
    // Send updated trip data to the backend
    fetch(`http://localhost:8080/exam/api/trips/update`, {
      method: 'PUT',
      body: JSON.stringify(updatedTripData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Handle the response from the backend if needed
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        console.log('Trip updated successfully');
      })
      .catch(error => console.error('Error updating trip:', error));
  };

  const handleEditFieldChange = (tripId, fieldName, value) => {
    // Update the field value for the specific trip
    const updatedTrips = trips.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, [fieldName]: value };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const handleButtonClick = (tripId) => {
    // Get the updated trip data
    const updatedTrip = trips.find(trip => trip.id === tripId);
    // Send updated trip data to the backend
    handleEditTrip(tripId, updatedTrip);
  };

  const handleRemoveUser = (tripId, userName) => {
    // Find the trip in the state
    console.log("removed: " + tripId, userName);
    const updatedTrips = trips.map(trip => {
      if (trip.id === tripId) {
        // Filter out the user with the matching userName
        const updatedUsersList = trip.usersList.filter(user => user.userName !== userName);
        return { ...trip, usersList: updatedUsersList };
      }
      return trip;
    });
  
    // Update the state with the modified trips
    setTrips(updatedTrips);
  
    // Send the userName and tripId to the backend
    fetch('http://localhost:8080/exam/api/trips/removeUser', {
      method: 'DELETE',
      body: JSON.stringify({ tripId, userName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Handle the response from the backend if needed
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        console.log('User removed successfully');
      })
      .catch(error => console.error('Error removing user:', error));
  };

  return (
    <div>
      {trips.map(trip => (
        <div key={trip.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p>
            <label>Trip Name: </label>
            <input
              type="text"
              value={trip.trip_name}
              onChange={(e) => handleEditFieldChange(trip.id, 'trip_name', e.target.value)}
            />
          </p>
          <p>ID: {trip.id}</p>
          <p>
            <label>Date: </label>
            <input
              type="text"
              value={trip.date}
              onChange={(e) => handleEditFieldChange(trip.id, 'date', e.target.value)}
            />
          </p>
          <p>
            <label>Time: </label>
            <input
              type="text"
              value={trip.time}
              onChange={(e) => handleEditFieldChange(trip.id, 'time', e.target.value)}
            />
          </p>
          <p>
            <label>Location: </label>
            <input
              type="text"
              value={trip.location}
              onChange={(e) => handleEditFieldChange(trip.id, 'location', e.target.value)}
            />
          </p>
          <p>
            <label>Duration: </label>
            <input
              type="text"
              value={trip.duration}
              onChange={(e) => handleEditFieldChange(trip.id, 'duration', e.target.value)}
            />
          </p>
          <p>
            <label>Packing List: </label>
            <input
              type="text"
              value={trip.packingList}
              onChange={(e) => handleEditFieldChange(trip.id, 'packingList', e.target.value)}
            />
          </p>
          <p>
            <label>Guide Name: </label>
            <input
              type="text"
              value={trip.guide_name}
              onChange={(e) => handleEditFieldChange(trip.id, 'guide_name', e.target.value)}
            />
          </p>
          {trip.usersList && trip.usersList.length > 0 && (
            <div>
              <p>Connected Users:</p>
              <table>
                <tbody>
                  {trip.usersList.map((user, index) => (
                    <tr key={index}>
                      <td>{user.userName}</td>
                      <td>
                        <button onClick={() => handleRemoveUser(trip.id, user.userName)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button onClick={() => handleButtonClick(trip.id)}>Save Changes</button>
        </div>
      ))}
    </div>
  );
};

export default EditTrips;
