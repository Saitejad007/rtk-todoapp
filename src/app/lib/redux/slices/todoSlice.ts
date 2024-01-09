import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  content: string;
}
interface TodoState {
  todoList: Todo[];
}
export type { Todo, TodoState };

const initialState: TodoState = {
  todoList: [
    { id: "1", content: "Hit the gym" },
    { id: "2", content: "Meet George" },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newList = {
        id: uuidv4(),
        content: action.payload,
      };
      state.todoList.push(newList);
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
