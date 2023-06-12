import React, { useState } from 'react';
import {guideURL} from "../Setting.js";
const GuideForm = () => {
  
  const [GUIDE_NAME, setGuideName] = useState('');
  const [gender, setGender] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [profile, setProfile] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      GUIDE_NAME,
        gender,
        birthyear,
        profile,
        imageUrl,
    };
    console.log(formData);

    // Send the form data to the backend (replace 'apiEndpoint' with your actual endpoint)
    fetch(guideURL, {
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
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <div>
      <label>
        Guide Name
        <input
          type="text"
          value={GUIDE_NAME}
          onChange={e => setGuideName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Gender:
        <input
          type="text"
          value={gender}
          onChange={e => setGender(e.target.value)}
        />
      </label>
      <br />
      <label>
        Birthyear:
        <input
          type="text"
          value={birthyear}
          onChange={e => setBirthyear(e.target.value)}
        />
      </label>
      <br />
      <label>
        Profile:
        <input
          type="text"
          value={profile}
          onChange={e => setProfile(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image link:
        <input
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GuideForm;
