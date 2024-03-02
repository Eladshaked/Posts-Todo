import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./style/userData.css";

const UserData = ({
  todos,
  posts,
  markTodoCompleted,
  updateUserById,
  addNewTodo,
  addNewPost,
}) => {
  const { id } = useParams();
  sessionStorage["user_id"] = id;

  const userTodos = todos.filter((todo) => todo.userId === parseInt(id));
  const userPosts = posts.filter((post) => post.userId === parseInt(id));
  const [addTodo, setAddTodo] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
  };

  return (
    <div>
      <h2>User ID: {id}</h2>
      {addTodo ? (
        <div className="addStyle">
          <input
            type="text"
            placeholder="Enter new Todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button
            style={{ background: "lightgreen" }}
            onClick={() => {
              addNewTodo({ newTodoTitle: newTodoText, id: id });
              setNewTodoText("");
              setAddTodo(!addTodo);
            }}
          >
            Add
          </button>
          <button onClick={toggleAddTodo} className="addButton">
            Cancel
          </button>
        </div>
      ) : (
        <ul className="user_lists">
          <button onClick={toggleAddTodo}>Add todo</button>
          <h3>Todos:</h3>
          {userTodos.map((todo) => (
            <li key={todo.id}>
              <strong>title:</strong> {todo.title}
              <br />
              <br />
              <strong>completed:</strong> {`${todo.completed}`}
              {!todo.completed && (
                <button
                  className={`yellow-button ${
                    todo.completed ? "completed" : ""
                  }`}
                  onClick={() => {
                    markTodoCompleted(todo.id); // קריאה לפונקציה לסימון כמושלם
                  }}
                >
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {addPost ? (
        <div className="addStyle">
          Title : 
          <input
            type="text"
            placeholder="Enter new post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            required
          />
          <br />
          Body : 
          <input
            type="text"
            placeholder="Enter new post body"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
            required
          />
          <button
            style={{ background: "lightgreen" }}
            onClick={() => {
              addNewPost({ newPostTitle: newPostTitle, newPostBody: newPostBody, id: id });
              setNewPostTitle("");
              setNewPostBody("");
              setAddPost(!addPost);
            }}
          >
            Add
          </button>
          <button onClick={() => setAddPost(!addPost)} className="addButton">
            Cancel
          </button>
        </div>
      ) : (
        // Render the list of Todos
        <div>
          <h3>Posts:</h3>
          <button onClick={() => setAddPost(!addPost)}>Add Post</button>
          <ul className="user_lists">
            {userPosts.map((post) => (
              <li key={post.id}>
                <strong>title: </strong>
                {post.title}
                <br />
                <br />
                <strong>Body:</strong>
                {post.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserData;
