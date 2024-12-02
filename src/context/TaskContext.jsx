import PropTypes from 'prop-types';
import { createContext, useContext, useState, useCallback } from 'react';
import { taskService } from '../services/taskService';

const TaskContext = createContext(undefined);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      setLoading(true);
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setError(null);
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      setError(null);
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};


TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
