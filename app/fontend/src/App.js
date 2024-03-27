import { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import HeroSection from "./components/HeroSection/HeroSection";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { Main } from "./components/Main/Main";
import axios from "axios";

function App() {
  const [taskGroup, setTaskGroup] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/tasks`);
      setTaskGroup(response.data.tasks);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTaskGroup(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <>
      <NavBar />
      <HeroSection />
      <Main>
        <TaskList taskGroup={taskGroup} fetchData={fetchData} setTaskGroup={setTaskGroup}/>
        <TaskForm onTaskAdded={handleTaskAdded} taskGroup={taskGroup} setTaskGroup={setTaskGroup} />
      </Main>

    </>
  );
}

export default App;
