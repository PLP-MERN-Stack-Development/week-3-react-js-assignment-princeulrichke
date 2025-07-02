import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state with localStorage persistence
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if no stored value exists
 * @returns {Array} - [storedValue, setValue] tuple
 */
export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Custom hook for managing tasks with localStorage persistence
 * @returns {Object} - Tasks management object
 */
export const useTaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Add a new task
  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now() + Math.random(), // Ensure unique ID
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    }
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Update task text
  const updateTask = (id, newText) => {
    if (newText.trim()) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, text: newText.trim() } : task
        )
      );
    }
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Clear completed tasks
  const clearCompletedTasks = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Get filtered tasks
  const getFilteredTasks = (filter) => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  // Get task statistics
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    
    return {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearAllTasks,
    clearCompletedTasks,
    getFilteredTasks,
    getTaskStats,
  };
};
