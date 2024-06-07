import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent page from reloading
    if (value) {
      setValue(""); //clear the form after submission

      addTodo(value);
    } else {
      alert("Empty task Not Allowed");          // validation  for users so that empty task not be added
    }
  };
  return (
    <>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="What's Your Task?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          <b>Add Task</b>
        </button>
      </form>
    </>
  );
};

export default TodoForm;
