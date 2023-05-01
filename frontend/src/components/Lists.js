import React from 'react'
import axios from "axios";
import { baseURL } from "../utils/content";


const Lists = ({ id, task, setUpdateUI, updateMode }) => {
    const removeTask = () => {
      axios.delete(`${baseURL}/delete/${id}`).then((res) => {
        console.log(res);
        setUpdateUI((prevState) => !prevState);
      });
    };
  return (
    <div className='container mt-3'>
        <table className="my-5 table bg-dark  table-bordered border-primary">
        <tr className='text-center text-warning'>
      <th scope="col">Task</th>
      <th scope="col">Update </th>
      <th scope="col">Delete</th>
      
    </tr>
    <tr className='text-center text-white'>
      <td>{task}</td>
      
      <td><button type="button" className="btn btn-primary text-primary" onClick={() => updateMode(id, task)}>Update</button></td>
      <td><button type="button" className="btn btn-danger text-danger" onClick={removeTask}>Delete</button></td>
      
    </tr>
</table>
    </div>
  )
}

export default Lists