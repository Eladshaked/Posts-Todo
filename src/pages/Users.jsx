import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style/users.css";
import User from "./User";

const Users = ({ getAll, updateUserById, deleteUserById, getDataByUserId }) => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    const loadData = () => {
      setUsers(getAll("users"));
      setTodos(getAll("todos"));
      setFilteredUsers(users);
    };

    loadData();
  }, [getAll, users]);

  const setSelectedUser = (id) => {
    setSelectedUserId(id);
  };

  const filterUsers = (text) => {
    setSearchText(text);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = (userId) => {
    // מחיקת משתמש ועדכון הסטייט שבקומפוננט
    deleteUserById(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="allUsers">
      <strong>Search: </strong>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchText}
        onChange={(e) => filterUsers(e.target.value)}
      />
      <Link to={"/addUser"}>
        <button>ADD User</button>
      </Link>
      <br />
      <br />
      {filteredUsers.map((user) => (
        <User
          key={user.id}
          user={user}
          updateUserById={updateUserById}
          deleteUserById={handleDeleteUser}
          selectedUserId={selectedUserId}
          setSelectedUser={setSelectedUser}
          todos={todos.filter((todo) => todo.userId === user.id)}
        />
      ))}
    </div>
  );
};

export default Users;
