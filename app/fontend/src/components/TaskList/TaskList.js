import axios from "axios";
import "./TaskList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const TaskList = ({ taskGroup, fetchData, setTaskGroup }) => {
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}`);
      // After deletion, fetch the updated list of tasks
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleTaskStatus = async (taskId, completed) => {
    try {
      // Toggle the completed status locally first
      const updatedTasks = taskGroup.map((task) =>
        task.id === taskId ? { ...task, completed: !completed } : task
      );
      setTaskGroup(updatedTasks);
        console.log("taskID is ", taskId);
        console.log(typeof(taskId));
      // Send a PUT request to update the task status on the server
      await axios.put(`http://localhost:8000/tasks/${taskId}`, {
        completed: !completed, //Toggle the completed status
      });
      // After updating, fetch the updated list of tasks
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="tasklist__container">
      <h1 className="tasklist__title">Tasks</h1>
      <ul className="tasklist__list">
        {taskGroup.map((task) => (
          <li className="tasklist__list-item" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id, task.completed)}
            />
            <button
              onClick={() => deleteTask(task.id)}
              className="tasklist__delete-btn">
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <span className={task.completed ? "completed" : ""}>
              {task.task}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
