import React, { useEffect, useState } from 'react';
import {dinnereventURLUpdate,dinnereventURLAll} from "../Setting.js";

const EditEvents = () => {
  const [dinnerEvents, setDinnerEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetch(dinnereventURLAll)
      .then(response => response.json())
      .then(data => setDinnerEvents(data))
      .catch(error => console.error(error));
  }, []);

  const handleEditEvent = event => {
    setEditEvent(event);
  };

  const handleUpdateEvent = () => {
    if (editEvent) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEvent)
      };

      fetch(dinnereventURLUpdate, requestOptions)
        .then(response => {
          if (response.ok) {
            // Update the dinner event in the local state
            setDinnerEvents(prevEvents =>
              prevEvents.map(prevEvent =>
                prevEvent.id === editEvent.id ? editEvent : prevEvent
              )
            );
            // Reset the edit event
            setEditEvent(null);
          } else {
            throw new Error('Failed to update dinner event');
          }
        })
        .catch(error => console.error(error));
    }
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
                  <button onClick={() => handleEditEvent(event)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editEvent && (
        <div>
          <h2>Edit Dinner Event</h2>
          <p>Event ID: {editEvent.id}</p>
          <p>
            Event Name:{' '}
            <input
              type="text"
              value={editEvent.eventname}
              onChange={e =>
                setEditEvent(prevEvent => ({
                  ...prevEvent,
                  eventname: e.target.value
                }))
              }
            />
          </p>
          <p>
            Dish:{' '}
            <input
              type="text"
              value={editEvent.dish}
              onChange={e =>
                setEditEvent(prevEvent => ({
                  ...prevEvent,
                  dish: e.target.value
                }))
              }
            />
          </p>
          <p>
            Location:{' '}
            <input
              type="text"
              value={editEvent.location}
              onChange={e =>
                setEditEvent(prevEvent => ({
                  ...prevEvent,
                  location: e.target.value
                }))
              }
            />
          </p>
          <p>
            Price:{' '}
            <input
              type="number"
              value={editEvent.price}
              onChange={e =>
                setEditEvent(prevEvent => ({
                  ...prevEvent,
                  price: parseInt(e.target.value)
                }))
              }
            />
          </p>
          <button onClick={handleUpdateEvent}>Update</button>
          <button onClick={() => setEditEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EditEvents;
