import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Todo {
  todo_id: string;
  content: string;
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

export const deleteTodo = createAsyncThunk(
  "todo/delete",
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
  reducers: {
    // addTodo: (state, action) => {
    //   const newList = {
    //     id: uuidv4(),
    //     content: action.payload,
    //   };
    //   state.todoList.push(newList);
    // },
    // removeTodo: (state, action) => {
    //   state.todoList = state.todoList.filter(
    //     (todo) => todo.id !== action.payload
    //   );
    // },
    // editTodo: (state, action) => {
    //   const { id, content } = action.payload;
    //   state.todoList = state.todoList.map((todo) => {
    //     if (todo.id === id) {
    //       todo.content = content;
    //     }
    //     return todo;
    //   });
    // },
  },
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
      console.log("payloaddd", action.payload);
      state.todoList = state.todoList.filter(
        (todo) => todo.todo_id !== action.payload.deleted_id
      );
      state.error = false;
      state.errorMsg = "";
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = true;
      state.errorMsg = action.error.message || "Todo creation failed";
    });
  },
});

// export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
