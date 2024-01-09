import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, content: "Hit the gym" },
  { id: 2, content: "Meet George" },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push = action.payload;
    },
  },
});

export const { addTodo } = todoSlice.actions;
