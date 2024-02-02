import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  todo_id: string;
  comment: string;
}
interface TodoState {
  todoList: Todo[];
  error: boolean;
  errorMsg: string;
}
export type { Todo, TodoState };

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/todos/get-todos");
    return res.data;
  } catch (error) {
    throw error;
  }
});

export const createTodo = createAsyncThunk(
  "todo/addTodo",
  async (payload: { todo: string; userId: number }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/todos/add-todo",
        payload
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTodo = createAsyncThunk(
  `todo/update/:id`,
  async (payload: { id: number; comment: string }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/todos/update-todo/${payload.id}`,
        { comment: payload.comment }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  `todo/delete/:id`,
  async (payload: { id: number }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/todos/delete-todo/${payload.id}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: TodoState = {
  todoList: [],
  error: false,
  errorMsg: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todoList.push(action.payload.todoItem);
      state.error = false;
      state.errorMsg = "";
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.error = true;
      state.errorMsg = action.error.message || "Todo creation failed";
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todoList = action.payload.todos;
      state.error = false;
      state.errorMsg = "";
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.error = true;
      state.errorMsg = action.error.message || "Todo creation failed";
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todoList = state.todoList.filter((todo) => {
        return todo.todo_id != action.payload.deleted_id;
      });
      state.error = false;
      state.errorMsg = "";
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = true;
      state.errorMsg = action.error.message || "Todo creation failed";
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.todoList = state.todoList.map((todo) => {
        if (todo.todo_id == action.payload.todo_id) {
          todo.comment = action.payload.comment;
        }
        return todo;
      });
      state.error = false;
      state.errorMsg = "";
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = true;
      state.errorMsg = action.error.message || "Todo creation failed";
    });
  },
});

export default todoSlice.reducer;
