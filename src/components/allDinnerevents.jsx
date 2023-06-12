import React, { useEffect, useState } from 'react';

const AllDinnerEvents = ({ user }) => {
  const [dinnerEvents, setDinnerEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/exam/api/dinnerevents/all')
      .then(response => response.json())
      .then(data => setDinnerEvents(data))
      .catch(error => console.error(error));
  }, []);

  const handleAssignFamily = dinnerEvent => {
    const requestBody = {
      user: {
        ...user,
        user_email: user.username
      },
      dinnerEvent
    };

    console.log('Request Body:', requestBody);

    fetch('http://localhost:8080/exam/api/dinnerevents/assignFamily', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Family assigned successfully');
        } else {
          throw new Error('Failed to assign family');
        }
      })
      .catch(error => console.error(error));
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dinnerEvents.map(event => (
              <tr key={event.id}>
                <td>{event.eventname}</td>
                <td>{event.dish}</td>
                <td>{event.location}</td>
                <td>{event.price}</td>
                <td>
                  <button onClick={() => handleAssignFamily(event)}>
                    Assign My Family
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllDinnerEvents;
