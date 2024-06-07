import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import Todo from './TaskList'; // Importing TaskList component
import EditTodoForm from './Edit';

uuidv4(); // This seems unnecessary, you can remove this line

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]); // State to store todo items

    useEffect(() => {
        // Load todos from localStorage on component mount
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = todo => {
        // Add a new todo item to the list
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save todos to localStorage
    }

    const toggleComplete = id => {
        // Toggle completion status of a todo item
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save todos to localStorage
    }

    const deleteTodo = id => {
        // Delete a todo item
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save todos to localStorage
    }

    const editTodo = id => {
        // Toggle edit mode of a todo item
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id) => {
        // Edit task of a todo item
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save todos to localStorage
    }

    const getMessage = () => {
        // Function to determine message based on completion percentage
        const percentage = numcomplete / numtotal * 100;

        // Determine message based on completion percentage
        if (percentage === 0) {
            return 'Try to do at least one! 🙏';
        }
        if (percentage === 100) {
            return 'Nice job for today! 🏝';
        }
        return 'Keep it going 💪🏻';
    }

    const numcomplete = todos.filter(todo => todo.completed).length; // Count of completed todos
    const numtotal = todos.length; // Total number of todos
    
    return (
        <div className='TodoWrapper'>
            {/* Display number of completed tasks and message */}
            <h3>{numcomplete}/{numtotal} tasks Completed 🎉</h3>
            <h1>{getMessage()}</h1>
            {/* Render TodoForm component for adding todos */}
            <TodoForm addTodo={addTodo} />
            {/* Map through todos and render Todo or EditTodoForm components based on edit mode */}
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} />
                ) : (
                    <>
                        <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                    </>
                )
            ))}
        </div>
    );
}
