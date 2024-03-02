
import "./style/Instructions.css";

const InstructionsComp = () => {
  return (
    <div>
      <h1>Expline</h1>
      <h2>A system for managing assignments and posts.</h2>
      <ol className="alternating-colors">
        <li>
          On the left screen you can see all the users registered in the system.
        </li>
        <li>
          You can search for a user by letters in the username or email, by
          writing the letters in the search.
        </li>
        <li>
          When clicking on the "add user" button, you can enter details and
          register a new user.
        </li>
        <li>
          You can delete or update the user information with the corresponding
          buttons.
        </li>
        <li>
          When you click on a user's ID number, you can see all their tasks and
          posts.
        </li>
        <li>You can mark a task as "complete" or add a new task.</li>
        <li>You can add new posts.</li>
        <li>
          A user who has completed all their tasks will be marked in green.
        </li>
      </ol>
      Enjoy using it, and good luck.
    </div>
  );
};

export default InstructionsComp;
