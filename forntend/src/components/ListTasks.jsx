import React, { useEffect, useState } from 'react';
import Section from './Section';

const ListTasks = ({ tasks, setTasks }) => {
  const [taskLists, setTaskLists] = useState({
    todos: [],
    inProgress: [],
    closed: [],
  });

  useEffect(() => {
    if (tasks && tasks.task && typeof tasks.task === 'object') {
      const taskData = tasks.task;

      const filterTasksByStatus = (status) => {
        return Object.keys(taskData)
          .filter((taskId) => taskData[taskId].status === status)
          .map((taskId) => ({ ...taskData[taskId], id: taskId }));
      };

      setTaskLists({
        todos: filterTasksByStatus('To Do'),
        inProgress: filterTasksByStatus('Doing'),
        closed: filterTasksByStatus('Done'),
      });
    }
  }, [tasks]);

  const statuses = ['To Do', 'Doing', 'Done'];

  return (
    <div className='flex gap-16'>
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          {...taskLists} // Pass all task lists to Section
        />
      ))}
    </div>
  );
};

export default ListTasks;


