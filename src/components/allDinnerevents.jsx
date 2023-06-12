import React, { useEffect, useState } from 'react';

const AllDinnerEvents = () => {
  const [dinnerEvents, setDinnerEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/exam/api/dinnerevents/all')
      .then(response => response.json())
      .then(data => setDinnerEvents(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>All Dinner Events</h1>
      {dinnerEvents.length === 0 ? (
        <p>Loading dinner events...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Dish</th>
              <th>Location</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {dinnerEvents.map(event => (
              <tr key={event.id}>
                <td>{event.eventname}</td>
                <td>{event.dish}</td>
                <td>{event.location}</td>
                <td>{event.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllDinnerEvents;
