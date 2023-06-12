import React, { useState, useEffect } from 'react';
import {dinnereventURLAll,assignmentURLCreate} from "../Setting.js";

const AssignmentForm = () => {
  const [familyname, setFamilyname] = useState('');
  const [date, setDate] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [eventname, setEventname] = useState('');
  const [eventId, setEventId] = useState('');
  const [eventnames, setEventnames] = useState([]);
  const [creationStatus, setCreationStatus] = useState('');

  useEffect(() => {
    fetch(dinnereventURLAll)
      .then(response => response.json())
      .then(data => {
        setEventnames(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEventSelection = (event) => {
    const selectedEvent = event.target.value;
    const eventItem = eventnames.find(item => item.eventname === selectedEvent);
    if (eventItem) {
      setEventname(selectedEvent);
      setEventId(eventItem.id);
    } else {
      setEventname('');
      setEventId('');
    }
  };

  const handleSubmit = () => {
    // Laver et objekt med form data
    const formData = {
      familyname,
      date,
      contactInfo,
      eventname,
      eventid: eventId, 
    };
    console.log(formData);

    // Sender form data til backend the backend
    fetch(assignmentURLCreate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        
        console.log(data);

        // Tømmer lige inputfelterne
        setFamilyname('');
        setDate('');
        setContactInfo('');
        setEventname('');
        setEventId('');

        // bekræfter det er gået godt
        setCreationStatus('Assignment was created');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      {creationStatus && <p>{creationStatus}</p>}
      <label>
        Assign Event:
        <select value={eventname} onChange={handleEventSelection}>
          <option value="">Select an event</option>
          {eventnames.map((eventItem, index) => (
            <option key={index} value={eventItem.eventname}>
              {eventItem.eventname}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Familyname:
        <input type="text" value={familyname} onChange={e => setFamilyname(e.target.value)} />
      </label>
      <br />
      <label>
        Date:
        <input type="text" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        Contact Info:
        <input type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AssignmentForm;