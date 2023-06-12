import React, { useEffect, useState } from 'react';
import {dinnereventURLAll,dinnereventURLDelete} from "../Setting.js";

const AllDinnerEvents = () => {
  const [dinnerEvents, setDinnerEvents] = useState([]);

  useEffect(() => {
    fetch(dinnereventURLAll)
      .then(response => response.json())
      .then(data => setDinnerEvents(data))
      .catch(error => console.error(error));
  }, []);

  const handleDeleteEvent = (event) => {
    console.log('Deleting event:', event);

    fetch(dinnereventURLDelete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(response => {
        if (response.ok) {
          console.log('Event deleted successfully');
          // Henter alle events igen efter sletning
          fetch(dinnereventURLAll)
            .then(response => response.json())
            .then(data => setDinnerEvents(data))
            .catch(error => console.error(error));
        } else {
          throw new Error('Failed to delete event');
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
                  <button onClick={() => handleDeleteEvent(event)}>
                    Delete
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
