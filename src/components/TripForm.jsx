import React, { useState, useEffect } from 'react';
import { tripURL, guideAllURL, tripCreateURL } from '../Setting.js';

const TripForm = () => {
  const [trip_name, setTripName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [packingList, setPackingList] = useState('');
  const [guide_name, setGuideName] = useState('');
  const [guideNames, setGuideNames] = useState([]);
  const [creationStatus, setCreationStatus] = useState('');

  useEffect(() => {
    fetch(guideAllURL)
      .then(response => response.json())
      .then(data => {
        // Set the guide names received from the backend
        setGuideNames(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      trip_name,
      date,
      time,
      location,
      duration,
      packingList,
      guide_name,
    };
    console.log(formData);

    // Send the form data to the backend (replace 'apiEndpoint' with your actual endpoint)
    fetch(tripCreateURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend if needed
        console.log(data);

        // Clear the input fields by updating the state variables with empty values
        setTripName('');
        setDate('');
        setTime('');
        setLocation('');
        setDuration('');
        setPackingList('');
        setGuideName('');

        // Set the creation status message
        setCreationStatus('Trip was created');
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <div>
      {creationStatus && <p>{creationStatus}</p>}
      <label>
        Assign Guide:
        <select value={guide_name} onChange={e => setGuideName(e.target.value)}>
          <option value="">Select a guide</option>
          {guideNames.map((guideName, index) => (
            <option key={index} value={guideName}>
              {guideName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Trip Name:
        <input type="text" value={trip_name} onChange={e => setTripName(e.target.value)} />
      </label>
      <br />
      <label>
        Date:
        <input type="text" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        Time:
        <input type="text" value={time} onChange={e => setTime(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Duration:
        <input type="text" value={duration} onChange={e => setDuration(e.target.value)} />
      </label>
      <br />
      <label>
        Packing List:
        <input type="text" value={packingList} onChange={e => setPackingList(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TripForm;
