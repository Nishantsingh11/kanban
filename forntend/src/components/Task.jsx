import axios from "axios";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { toast } from "react-hot-toast";

const Task = ({ task, setTasks, tasks }) => {
  const [model, setModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    todo: "",
  });
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/api/deleteTask${id}`)
      .then((res) => {
        axios.get('http://localhost:3002/api/getAllTask')
          .then((response) => {
            setTasks([...response.data.task]); // Create a new array
            toast.success("Task deleted successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
        console.log(err);
      })
  }
  

  const hadnleEdit = (id) => {
    console.log(id);
    setModel(!model);
  }

  const handleOnChanage = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3002/api/updateTask/${task._id}`, formData)
      .then((res) => {
        axios.get('http://localhost:3002/api/getAllTask')
          .then((response) => {
            setTasks(response.data.task);
            toast.success("Task updated successfully");
            setModel(!model);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  return (
    <>
      <div ref={drag} className={`relative p-8 mt-8 shadow-md rounded-md w-64 h-40 cursor-grab text-center justify-center items-center ${isDragging ? "opacity-25" : "opacity-100"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

        {isHovered ? (
          <p  className={`mt-10 font-bold transition-transform ${isHovered ? "translate-y-0" : "-translate-y-2"}`}>{task.description}</p>
        ) : (
          <p className="mt-10 font-bold">{task.title}</p>
        )}

        <div className="relative">
          <button className='absolute bottom-0  top-3 left-28 text-slate-400' onClick={() => handleDelete(task._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button className="absolute bottom-0 top-3 right-10 text-slate-400" onClick={() => hadnleEdit(task._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </button>
        </div>
      </div>

      {model && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
          <div className="bg-white p-4 shadow-md rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <form onSubmit={handleSumbit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md py-2 px-3 text-gray-700"
                  placeholder="Enter title"
                  name="title"
                  value={formData.title}
                  onChange={handleOnChanage}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="w-full border rounded-md py-2 px-3 text-gray-700"
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleOnChanage}
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => hadnleEdit(task._id)}
                  className="mr-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
