import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style/user.css";

const User = ({
  user,
  todos,
  updateUserById,
  deleteUserById,
  selectedUserId,
  setSelectedUser,
}) => {
  const id = sessionStorage["user_id"];

  const [isComplitedTasks, setIsComplitedTasks] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    setIsComplitedTasks(todos.every((todo) => todo.completed));
    setIsHighlighted(user.id == id);
  }, [todos, id]);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseClick = () => {
    setIsMouseOver(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "name" || name == "email") {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [name]: value,
        },
      }));
      console.log(name, value);
    }
  };

  const usersStyle = {
    border: "3px solid",
    borderColor: isComplitedTasks ? "#4CBB17" : "red",
    padding: "10px",
    margin: "10px",
  };

  return (
    <div
      style={usersStyle}
      className={user.id === selectedUserId ? "highlighted" : ""}
    >
      <Link
        to={`/user_data/${user.id}`}
        onClick={() => setSelectedUser(user.id)}
      >
        User ID: {user.id}
      </Link>
      <br />
      <br />
      Name:{" "}
      <input
        type="text"
        name="name"
        value={currentUser.name}
        onChange={handleInputChange}
      />
      <br /> <br />
      Email:{" "}
      <input
        type="text"
        name="email"
        value={currentUser.email}
        onChange={handleInputChange}
      />
      <br />
      <br />
      {currentUser.address?.city != undefined && (
        <button onMouseOver={handleMouseOver} onClick={handleMouseClick}>
          Other Data
        </button>
      )}
      {isMouseOver && (
        <div className="otherDataStyle">
          <strong>Other Data:</strong>
          <br />
          <br />
          Street:{" "}
          <input
            type="text"
            name="street"
            value={currentUser.address.street}
            onChange={handleInputChange}
          />
          <br />
          <br />
          City:{" "}
          <input
            type="text"
            name="city"
            value={currentUser.address.city}
            onChange={handleInputChange}
          />
          <br />
          <br />
          Zipcode:{" "}
          <input
            type="text"
            name="zipcode"
            value={currentUser.address.zipcode}
            onChange={handleInputChange}
          />
        </div>
      )}
      <button
        className="changeButton"
        onClick={() => updateUserById(user.id, currentUser)}
      >
        Update
      </button>
      <button className="changeButton" onClick={() => deleteUserById(user.id)}>
        Delete
      </button>
    </div>
  );
};

export default User;
