import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm.js';

// const TASKSLIST = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const url = 'https://task-list-api-c17.herokuapp.com/tasks';

  useEffect(() => {
  //   axios.get(url)
  //     .then((response) => {
  //       console.log(response);
  //       const pulledTasks = response.data.map((task) => {
  //         return {
  //           id: task.id,
  //           title: task.title,
  //           isComplete: task.is_complete,
  //           description: task.description,
  //         };
  //       });
  //       console.log('in axios');
  //       setTasks(pulledTasks);
  //     })
  //     .catch((error) => {console.log(error);});
  // }, []);
  getTaskFromAPI();
}, []);

  const getTaskFromAPI = () => {
    axios.get(url)
        .then((response) => {setTasks(response.data);
        console.log(response.data);
        })
        .catch((error) => {console.log("Couldn't get tasks!");});
  };

  const updatingTasks = (id) => {
  console.log('in arrow', id);

    const updatedTasks = [...tasks];
    let targetTask;
    let completeness;
    for (let task of updatedTasks) {
      if (task.id === id) {
        targetTask = task;
        if (targetTask.isComplete) {
          completeness = 'mark_incomplete';
        } else {
          completeness = 'mark_complete';
        }
      } 
    }
    axios.patch(`https://task-list-api-c17.herokuapp.com/tasks/${targetTask.id}/${completeness}`)
         .then((response) => {
           targetTask.isComplete = !targetTask.isComplete;
           setTasks(updatedTasks);

         })
         .catch((error) => {
           console.log('Unable to update task!');
         });

    // const updatedTasks = [];

    // for (const task of tasks) {
    //   if (task.id === id) {
    //     task.isComplete = !task.isComplete;
    //   }
    //   updatedTasks.push(task);
    // }
    // console.log(`new list:${updatedTasks}`);
    // setTasks(updatedTasks);
  };

  const deleteTasks = (id) => {
    // const updatedTasks = [];
    // for (const task of tasks) {
    //   if (task.id !== id) {
    //     updatedTasks.push(task);
    //   }
    //   setTasks(updatedTasks);
    //   console.log('in delete function');
    // }
    
    axios.delete(`url/${id}`)
          .then((response) => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);  
          })
          .catch((error) => {
            console.log('Unable to delete');
          });
  };

  const makeNewTask = (data) => {
    console.log(data);
    axios.post(url, data)
         .then((response) => {
           getTaskFromAPI();
         })
         .catch((error) => {
           console.log("Couldn't post any task!");
         });
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          
            <TaskForm handleFormSubmission={makeNewTask}/>
            <TaskList
              tasks={tasks}
              updatingTasksCallback={updatingTasks}
              deleteTasksCallback={deleteTasks}
            />
          
        </div>
      </main>
    </div>
  );
};

export default App;
