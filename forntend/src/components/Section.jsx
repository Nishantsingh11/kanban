import { useDrop } from "react-dnd";
import { toast } from "react-hot-toast";
import Header from "./Header";
import Task from "./Task";
import axios from "axios";


const Section = ({ status, todos, tasks, setTasks, inProgress, closed, }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addItemToSection = (id) => {
    setTasks((prevTasks) => {
      // Create a copy of the previous tasks object
      const updatedTasks = { ...prevTasks };

      // Find the task with the matching ID
      const taskToUpdate = updatedTasks.task.find((task) => task._id === id);

      if (taskToUpdate) {
        // Update the status of the task
        taskToUpdate.status = status;
        axios.put(`http://localhost:3002/api/updateStatus/${id}`,{status:status})
        .then((res)=>{
          toast.success("Task updated successfully");
        })
        .catch((err)=>{
          toast.error("Task updated failed");
        }
        )
        
      }

      return updatedTasks;
    });
  }

  let text = "To Do"
  let bg = "bg-slate-500"
  let taskToMap = todos
  if (status === "Doing") {
    text = "Doing"
    bg = "bg-purple-500"
    taskToMap = inProgress
  }



  if (status === "Done") {
    text = "Done"
    bg = "bg-green-500"
    taskToMap = closed
  }



  return (
    <div className={`w-64 rounded-md ${isOver ? "bg-slate-400" : ""}`} ref={drop}>
      <Header text={text} bg={bg} count={taskToMap.length} />
      {taskToMap.length > 0 && taskToMap.map((item) => (
        <Task key={item._id} tasks={tasks} setTasks={setTasks} task={item} />
      ))}

    </div >
  )
}
export default Section


