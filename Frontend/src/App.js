import { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./Todo/Index";
import {addTodo as pushTodo} from './Store/TodoSlice' 
import { useDispatch } from "react-redux";

const API_BASE = process.env.REACT_APP_API_URL;
function App() {
  const dispatch = useDispatch()
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  
 
 
  const addTodo = async () => {
    try {
      const result = await axios.post(`${API_BASE}/new`,{ title: newTodo.toUpperCase()});
  
      dispatch(pushTodo(result.data))
  
    } catch (error) {
      console.log("error :>> ", error);
    }
    setPopupActive(false)
    setNewTodo("")
  };
  return (
    <div className="App">
      <h1>Welcome</h1>
      <h4>Your Task</h4>
      <Todo/>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup " onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              value={newTodo}
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
