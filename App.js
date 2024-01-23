import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
        .then(response => setTasks(response.data))
        .catch(error => console.error(error));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { title: newTask })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error(error));

    setNewTask('');
  };

  const updateTask = (id, title) => {
    axios.put(`http://localhost:5000/tasks/${id}`, { title })
        .then(response => setTasks(tasks.map(task => (task.id === id ? response.data : task))))
        .catch(error => console.error(error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
        .then(() => setTasks(tasks.filter(task => task.id !== id)))
        .catch(error => console.error(error));
  };
    const filterTasks = (tasks, keyword) => {
        return tasks.filter(task => task.title.toLowerCase().includes(keyword.toLowerCase()));
    };

    const filteredTasks = filterTasks(tasks, filterKeyword);

  return (
      <div>
        <h1>Task List</h1>
          <div>
              <label>Filter: </label>
              <input type="text" value={filterKeyword} onChange={(e) => setFilterKeyword(e.target.value)} />
          </div>
        <ul>
          {filteredTasks.map(task => (
              <li key={task.id}>
                {task.title}
                <button onClick={() => updateTask(task.id, prompt('Enter new task title:', task.title))}>Update</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
          ))}
        </ul>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>
  );
}

export default App;
