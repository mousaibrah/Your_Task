import { createSlice } from "@reduxjs/toolkit";
export const toDosSlice = createSlice({
  name: "toDos",
  initialState: {
    toDos: [],
  },
  reducers: {
    createToDos: (state, action) => {
      state.toDos = action.payload;
    },
    addTodo: (state, action) => {
      state.toDos = action.payload;
    },
    deleteTodo: (state, action) => {
      state.toDos = action.payload;
    },
    completeTodo: (state, action) => {
      state.toDos = action.payload;
    },
  },
});

export const { createToDos, addTodo, deleteTodo, completeTodo } =
  toDosSlice.actions;

export default toDosSlice.reducer;
