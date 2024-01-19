import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [task, setTask] = useState();
  const [data, setData] = useState("");

  const handleAddTask = async () => {
    try {
      console.log("clicked");
      const result = await axios.post("http://localhost:8000/add", { task });
      console.log(result);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/todo");
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const editHandler = async (id) => {
    try {
      const result = await axios.put(`http://localhost:8000/update/${id}`);
      console.log(result);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8000/delete/${id}`);
      console.log(result);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const taskHandler = (e) => {
    setTask(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <p>frontend</p>
      <input type="text" name="" id="" onChange={taskHandler} value={task} />
      <button onClick={handleAddTask}>tambah</button>

      {/* {data?.map((item, index) => {
            return <td key={index}>{item.task}</td>;
          })} */}
      {data.length !== 0 ? (
        data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-10 justify-center mt-10"
              onClick={() => editHandler(item._id)}
            >
              <p>{item.task}</p>
              <p>{item.done === true ? "selesai" : "belum"}</p>
              <button onClick={() => deleteHandler(item._id)}>hapus</button>
            </div>
          );
        })
      ) : (
        <p>tidak ada data</p>
      )}
    </div>
  );
}

export default App;
