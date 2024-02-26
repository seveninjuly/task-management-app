import React, { useState } from 'react';
import UnfinishedList from './components/UnfinishedList';
import FinishedList from './components/FinishedList';
import { Task, Joke } from './types';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [joke, setJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = { id: Date.now(), title: newTaskTitle, isFinished: false, isPrioritized: false };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const toggleFinish = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isFinished: !task.isFinished } : task));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  const fetchJoke = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error('Failed to fetch joke:', error);
      setJoke(null);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="app-container">
      <h1 className="app-title">What's Next?</h1>
      <div className="task-input-section">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task"
          className="task-input"
        />
        <button onClick={addTask} className="add-task-button">
          Add Task
        </button>
      </div>
      <div className="task-lists-container">
        <UnfinishedList tasks={tasks} toggleFinish={toggleFinish} removeTask={removeTask} />
        <FinishedList tasks={tasks} removeTask={removeTask} />
        <button
          className="take-break-button"
          onClick={fetchJoke}
          disabled={isLoading}
        >
          {isLoading ? 'One Sec' : 'Take A Break'}
        </button>
        {joke && (
          <div className="joke-display">
            <p>{joke.setup}</p>
            <p>{joke.punchline}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
