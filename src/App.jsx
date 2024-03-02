import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import "./pages/style/app.css";

import Users from "./pages/Users";
import User_data from "./pages/User data";
import InstructionsComp from "./pages/Instructions";
import AddUser from "./pages/AddUser";

function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newId, setNewId] = useState(11);

  useEffect(() => {
    const loadData = async () => {
      const { data: users } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(users);

      const { data: todos } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(todos);

      const { data: posts } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(posts);
    };

    loadData();
  }, []);

  //GET ALL
  const getAll = (data) => {
    if (data === "todos") {
      return todos;
    }
    if (data === "posts") {
      return posts;
    }
    if (data === "users") {
      return users;
    }
  };

  //GET DATA BY USER ID
  const getDataByUserId = (data, userId) => {
    if (data == "todos") {
      return todos.filter((item) => item.userId === userId);
    }
    if (data == "posts") {
      return posts.filter((item) => item.userId === userId);
    }
    if (data == "users") {
      return users.find((item) => item.id === userId);
    }
  };

  //UPDATE BY ID
  const updateUserById = (userId, newObj) => {
    const updatedUsers = [...users];

    const userIndex = updatedUsers.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...newObj };

      setUsers(updatedUsers);
    }
    // console.log(users[0].name);
  };

  const addTodo = (obj) => {
    const newTodo = {
      id: parseInt(todos.length) + 2,
      userId: parseInt(obj.id),
      title: obj.newTodoTitle,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const addPost = (obj) => {
    const newPost = {
      id: parseInt(posts.length) + 2,
      userId: parseInt(obj.id),
      title: obj.newPostTitle,
      body: obj.newPostBody,
    };
    setPosts([newPost, ...posts]);
  };

  const addUser = (obj) => {
    const newUser = {
      id: newId,
      name: obj.newUserName,
      email: obj.newUserEmail,
    };
    setNewId(newId + 1);
    setUsers([...users, newUser]);
  };

  //DELETE BY ID
  const deleteUserById = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    const updatedTodos = todos.filter((todo) => todo.userId !== userId);
    const updatedPosts = posts.filter((post) => post.userId !== userId);
    setUsers(updatedUsers);
    setTodos(updatedTodos);
    setPosts(updatedPosts);
  };

  const markTodoCompleted = (todoId) => {
    const updatedTodos = [...todos];
    const todoIndex = updatedTodos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      updatedTodos[todoIndex].completed = true;
      setTodos(updatedTodos);
    }
  };

  return (
    <>
      <div className="float-container">
        <div className="float-child">
          <Users
            getAll={getAll}
            addUser={addUser}
            updateUserById={updateUserById}
            deleteUserById={deleteUserById}
            getDataByUserId={getDataByUserId}
          />
        </div>

        <div className="float-child">
          <Routes>
            <Route path="/" element={<InstructionsComp />} />
            <Route
              path="/user_data/:id"
              element={
                <User_data
                  todos={todos}
                  posts={posts}
                  markTodoCompleted={markTodoCompleted}
                  updateUserById={updateUserById}
                  addNewTodo={addTodo}
                  addNewPost={addPost}
                />
              }
            />
            <Route path="/addUser" element={<AddUser addUser={addUser} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
