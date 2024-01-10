"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addTodo, editTodo, removeTodo } from "./lib/redux/slices/todoSlice";

export default function Home() {
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [editValue, setEditValue] = useState({
    id: "",
    content: "",
  });
  const dispatch = useDispatch();
  const todoList = useSelector((state: any) => state.todo.todoList);

  useEffect(() => {
    if (isEdit) {
      setEditValue({
        id: isEdit,
        content: todoList.find((item: any) => item.id === isEdit).content,
      });
    } else {
      setEditValue({
        id: "",
        content: "",
      });
    }
  }, [isEdit]);

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleAddTodo = () => {
    dispatch(addTodo(value));
    setValue("");
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = (id: string) => {
    setIsEdit(id);
  };

  const handleEditField = (id: string, e: any) => {
    setEditValue({
      ...editValue,
      id,
      content: e.target.value,
    });
  };

  const handleUpdateTodo = () => {
    dispatch(editTodo(editValue));
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
      <div>
        <ul>
          {todoList.map((item: any, index: number) => (
            <li key={item.id}>
              {isEdit !== item.id ? (
                <>
                  <p>{item.content}</p>
                  <button onClick={() => handleDeleteTodo(item.id)}>
                    delete
                  </button>
                  <button onClick={() => handleEditTodo(item.id)}>edit</button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={editValue.content}
                    onChange={(e) => handleEditField(item.id, e)}
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
