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
    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    editTodo: (state, action) => {
      const { id, content } = action.payload;
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === id) {
          todo.content = content;
        }
        return todo;
      });
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
