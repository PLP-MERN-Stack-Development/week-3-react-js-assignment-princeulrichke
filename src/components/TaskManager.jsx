import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useLocalStorage';
import Button from './Button';
import Card from './Card';

/**
 * TaskManager component for managing tasks
 * @returns {JSX.Element} - TaskManager component
 */
const TaskManager = () => {
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  const {
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearAllTasks,
    clearCompletedTasks,
    getFilteredTasks,
    getTaskStats,
  } = useTaskManager();

  const filteredTasks = getFilteredTasks(filter);
  const stats = getTaskStats();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      updateTask(editingTask, editText);
      setEditingTask(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Stats */}
      <Card className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.active}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.completionRate}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completion</p>
          </div>
        </div>
      </Card>

      {/* Add Task Form */}
      <Card>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label htmlFor="newTask" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add New Task
            </label>
            <div className="flex gap-2">
              <input
                id="newTask"
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Enter a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
              <Button type="submit" variant="primary">
                Add Task
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Filter Buttons */}
      <Card>
        <div className="flex flex-wrap gap-2 justify-center">
          {filterButtons.map((btn) => (
            <Button
              key={btn.key}
              variant={filter === btn.key ? 'primary' : 'secondary'}
              onClick={() => setFilter(btn.key)}
              className="flex items-center gap-2"
            >
              {btn.label}
              <span className={`px-2 py-1 text-xs rounded-full ${
                filter === btn.key 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {btn.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Bulk Actions */}
        {stats.total > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            {stats.completed > 0 && (
              <Button
                variant="danger"
                size="sm"
                onClick={clearCompletedTasks}
              >
                Clear Completed ({stats.completed})
              </Button>
            )}
            <Button
              variant="danger" 
              size="sm"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all tasks?')) {
                  clearAllTasks();
                }
              }}
            >
              Clear All Tasks ({stats.total})
            </Button>
          </div>
        )}
      </Card>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-lg font-medium">
                {filter === 'all' ? 'No tasks yet' : 
                 filter === 'active' ? 'No active tasks' : 
                 'No completed tasks'}
              </p>
              <p className="text-sm mt-2">
                {filter === 'all' ? 'Add your first task above!' : 
                 filter === 'active' ? 'All tasks are completed!' : 
                 'No completed tasks yet.'}
              </p>
            </div>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  {editingTask === task.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                        autoFocus
                      />
                      <Button variant="primary" size="sm" onClick={handleSaveEdit}>
                        Save
                      </Button>
                      <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className={`text-sm md:text-base transition-all duration-200 ${
                        task.completed 
                          ? 'line-through text-gray-500 dark:text-gray-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {task.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {editingTask !== task.id && (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditTask(task)}
                      className="p-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="p-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
