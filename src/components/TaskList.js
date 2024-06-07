import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="Todo">
      {/* Checkbox for toggling completion status */}
      <input 
        type="checkbox" 
        className={`${task.completed ? "completed" : "incompleted"}`} 
        checked={task.completed} // Checked status based on task completion
        onChange={() => toggleComplete(task.id)} // Toggle completion status on change
      />
      {/* Task text with completed style if task is completed */}
      <p className={`${task.completed ? "completed-text" : ""}`}>{task.task}</p>

      {/* Edit and delete icons */}
      <div>
        {/* Edit icon with onClick handler to trigger editTodo function */}
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        {/* Delete icon with onClick handler to trigger deleteTodo function */}
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  )
}

export default Todo
