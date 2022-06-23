import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';

const TASKSLIST = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKSLIST);

  const updatingTasks = (id) => {
    console.log('in arrow', id);
    const updatedTasks = [];

    for (const task of tasks) {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      updatedTasks.push(task);
    }
    console.log(`new list:${updatedTasks}`);
    setTasks(updatedTasks);
  };

  const deleteTasks = (id) => {
    const updatedTasks = [];
    for (const task of tasks) {
      if (task.id !== id) {
        updatedTasks.push(task);
      }
      setTasks(updatedTasks);
      console.log('in delete function');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              updatingTasksCallback={updatingTasks}
              deleteTasksCallback={deleteTasks}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
