"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./lib/redux/slices/todoSlice";
import { AppDispatch } from "./lib/redux/store";

export default function Home() {
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [editValue, setEditValue] = useState({
    id: "",
    comment: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const todoList = useSelector((state: any) => state.todoReducer.todoList);
  const todoState = useSelector((state: any) => state.todoReducer);

  useEffect(() => {
    if (isEdit) {
      setEditValue({
        id: isEdit,
        comment: todoList?.find((item: any) => item.todo_id === isEdit).comment,
      });
    } else {
      setEditValue({
        id: "",
        comment: "",
      });
    }
  }, [isEdit]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleAddTodo = async () => {
    await dispatch(createTodo({ todo: value, userId: 4 }));
    setValue("");
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo({ id }));
  };

  const handleEditTodo = (id: string) => {
    setIsEdit(id);
  };

  const handleEditField = (id: string, e: any) => {
    setEditValue({
      ...editValue,
      id,
      comment: e.target.value,
    });
  };

  const handleUpdateTodo = async () => {
    await dispatch(updateTodo({ ...editValue, id: parseInt(editValue.id) }));
    setIsEdit("");
  };

  const handleCancelUpdate = () => {
    setIsEdit("");
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleInput(e)}
          onKeyDown={(e) => {
            // @ts-expect-error
            e.keyCode == "13" && handleAddTodo();
          }}
        />
        <button onClick={handleAddTodo}>Add +</button>
      </div>
      {todoState.error && (
        <div>
          <p style={{ color: "#ff0000" }}>{todoState.errMsg}</p>
        </div>
      )}
      <div>
        <ul>
          {todoList?.map((item: any, index: number) => (
            <li key={item.todo_id}>
              {isEdit !== item.todo_id ? (
                <>
                  <p>{item.comment}</p>
                  <button onClick={() => handleDeleteTodo(item.todo_id)}>
                    delete
                  </button>
                  <button onClick={() => handleEditTodo(item.todo_id)}>
                    edit
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={editValue.comment}
                    onChange={(e) => handleEditField(item.todo_id, e)}
                  />
                  <button onClick={handleUpdateTodo}>update</button>
                  <button onClick={handleCancelUpdate}>cancel</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
