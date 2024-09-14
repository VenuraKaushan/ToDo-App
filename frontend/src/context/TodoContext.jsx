import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

// Create the context
export const TodoContext = createContext();

// Helper function to fetch todos from localStorage
const fetchTodosFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

// Helper function to save todos to localStorage
const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Provider component
export const TodoProvider = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Load todos specific to the current user
        const allTodos = fetchTodosFromLocalStorage();
        const userTodos = allTodos.filter(todo => todo.userId === authState.user?.id);
        setTodos(userTodos);
    }, [authState.user]);

    useEffect(() => {
        // Save todos to localStorage only when the todos state changes
        const allTodos = fetchTodosFromLocalStorage();
        const updatedTodos = allTodos.filter(todo => todo.userId !== authState.user?.id).concat(todos);
        saveTodosToLocalStorage(updatedTodos);
    }, [todos]);

    const addTodo = (title, description) => {
        const newTodo = {
            id: Date.now(),
            title,
            description,
            completed: false,
            userId: authState.user?.id
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const editTodo = (id, updatedTitle, updatedDescription) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id
                    ? { ...todo, title: updatedTitle, description: updatedDescription }
                    : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const toggleTodoCompletion = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleTodoCompletion }}>
            {children}
        </TodoContext.Provider>
    );
};
