import React, { useEffect, useState } from "react";
import { assignmentURLAll, assignmentURLAdduser } from "../Setting.js";

const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [userInputs, setUserInputs] = useState({});

  useEffect(() => {
    fetch(assignmentURLAll)
      .then((response) => response.json())
      .then((data) => {
        const initialUserInputs = data.reduce((acc, assignment) => {
          return { ...acc, [assignment.id]: "" };
        }, {});
        setUserInputs(initialUserInputs);
        setAssignments(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddUser = (id) => {
    const userInput = userInputs[id];

    const requestBody = {
      id: id,
      userInput: userInput,
    };

    console.log("Data sent to POST:", requestBody);

    fetch(assignmentURLAdduser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User added successfully");
        } else {
          throw new Error("Failed to add user");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUserInputChange = (id, value) => {
    setUserInputs((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  return (
    <div>
      <h1>All Assignments</h1>
      {assignments.length === 0 ? (
        <p>Loading assignments...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Family Name</th>
              <th>Event Name</th>
              <th>Date</th>
              <th>Contact Info</th>
              <th>Add User</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.familyname}</td>
                <td>{assignment.eventname}</td>
                <td>{assignment.date}</td>
                <td>{assignment.contactinfo}</td>
                <td>
                  <input
                    type="text"
                    value={userInputs[assignment.id]}
                    onChange={(e) =>
                      handleUserInputChange(assignment.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleAddUser(assignment.id)}>
                    Add User
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

export default AllAssignments;
