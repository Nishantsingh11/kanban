import React, { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3002/api/getAllTask");
        console.log(response);
        setTasks(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
        setLoading(false);
      }
    }

    fetchData();
  }, [tasks]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />

      <div className="bg-slate-100 w-screen h-full flex flex-col items-center gap-16 pt-32">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ListTasks tasks={tasks} setTasks={setTasks} />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
