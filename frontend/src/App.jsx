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
            <div key={index} className="">
              <p>{item.task}</p>
              <button>hapus</button>
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
