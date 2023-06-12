import React, { useState } from 'react';
import {dinnereventURLCreate} from "../Setting.js";
const DinnereventForm = () => {
  
  const [eventname, setEventname] = useState('');
  const [location, setLocation] = useState('');
  const [dish, setDish] = useState('');
  const [price, setPrice] = useState('');
 

  const handleSubmit = () => {
    // laver et objekt med form data
    const formData = {
      eventname,
        location,
        dish,
        price,
    };
    console.log(formData);

    // Sender form data til backend 
    fetch(dinnereventURLCreate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <label>
        Eventname
        <input
          type="text"
          value={eventname}
          onChange={e => setEventname(e.target.value)}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Dish:
        <input
          type="text"
          value={dish}
          onChange={e => setDish(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DinnereventForm;
