import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do', // it can be progress or done
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.length < 3) return toast.error('Task title must be at least 3 characters long');
    if (task.title.length > 100) return toast.error('Task title must be under 100 characters long');

    axios
      .post('http://localhost:3002/api/addTask', task)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // setTasks((prev) => {
    //   const list = [...prev, task];
    //   localStorage.setItem('tasks', JSON.stringify(list));
    //   return list;
    // });

    toast.success('Task added successfully');

    setTask({
      title: '',
      description: '',
      status: 'To Do',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex flex-col">
        <label htmlFor="title">Enter Your Title</label>
        <input
          type="text"
          id="title"
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Enter Your Description</label>
        <textarea
          id="description"
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-32 w-64 px-1"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>

      <button type="submit" className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Add
      </button>
    </form>
  );
};

export default CreateTask;
