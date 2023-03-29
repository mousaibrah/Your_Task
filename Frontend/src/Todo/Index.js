import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createToDos,
  deleteTodo as deleteOne,
  completeTodo as toggle,
} from "../Store/TodoSlice";

const Todo = () => {
  const API_BASE = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.toDos.toDos);
  const getToDos = async () => {
    try {
      const data = await axios.get(API_BASE);
      dispatch(createToDos(data.data));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    getToDos();
  }, []);
  const completeTodo = async (id) => {
    try {
      const result = await axios.put(`${API_BASE}/complete/${id}`);

      dispatch(toggle(result.data));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const result = await axios.delete(`${API_BASE}/delete/${id}`);
      dispatch(deleteOne(result.data));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <>
      <div className="todos">
        {state.map((todo) => (
          <div
            key={todo.todo_id}
            className={`todo ${todo.complete ? "is-complete" : ""}`}
          >
            <div
              className="checkbox"
              onClick={() => completeTodo(todo.todo_id)}
            >
              {todo.complete}
            </div>

            <div className="text">{todo.title}</div>

            <div
              className="delete-todo"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              x
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
