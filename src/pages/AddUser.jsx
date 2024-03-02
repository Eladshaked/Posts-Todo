import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style/userData.css";

const AddUser = ({ addUser }) => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  return (
    <div>
      <h1>Add new User</h1>
      <div className="addStyle">
        Name :
        <input
          type="text"
          placeholder="Enter new Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          required
        />
        <br />
        Email :
        <input
          type="text"
          placeholder="Enter new Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          required
        />
        <Link to={'../'}>
          <button
            style={{ background: "lightgreen" }}
            onClick={() => {
              addUser({
                newUserName: newUserName,
                newUserEmail: newUserEmail,
              });
              setNewUserName("");
              setNewUserEmail("");
            }}
          >
            Add
          </button>
        </Link>
        <Link to={"../"}>
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default AddUser;
