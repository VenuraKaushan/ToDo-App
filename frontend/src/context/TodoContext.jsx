import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const TodoContext = createContext();

// Provider component
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Add a new todo
    const addTodo = (title, description) => {
        const newTodo = {
            id: Date.now(),
            title,
            description,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    // Edit an existing todo
    const editTodo = (id, updatedTitle, updatedDescription) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, title: updatedTitle, description: updatedDescription }
                : todo
        ));
    };

    // Delete a todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Toggle completed status
    const toggleTodoCompletion = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleTodoCompletion }}>
            {children}
        </TodoContext.Provider>
    );
};