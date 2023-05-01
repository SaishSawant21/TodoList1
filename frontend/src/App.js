import React, { useEffect, useState } from "react";
import Lists from './components/Lists'
import axios from "axios";
import { baseURL } from './utils/content';
import Header from "./components/Header";
const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput("");
    });
  };

  return (
    <>
    <Header/>
    <main>
    <div className='container mt-5 '>
      <form className="bg-dark border border-primary ">
      <div className="mb-3 mx-5">
    <label  className="form-label text-white mt-1">Add Task To Do</label>
    <input type="text" className="form-control m-auto" id="exampleInputEmail1" value={input} onChange={(e) => setInput(e.target.value)}/>
  </div>
 
  <button type="submit" className="btn btn-primary mx-5 mb-3"  value="Add" onClick={updateId ? updateTask : addTask} >{updateId ? "Update Task" : "Add Task"}</button>
</form>
{tasks.map((task) => (
          <Lists
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
    </div>
    </main>
    </>
  )
}



export default App