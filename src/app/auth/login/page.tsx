"use client";

import React, { useState } from "react";
import styles from "../auth.module.css";
import { useRouter } from "next/router";
import { handleLogin } from "../../lib/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/lib/redux/store";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const authState = useSelector((state: any) => state.authReducer);

  const handleSubmit = async () => {
    // Validate input fields
    if (!user.email || !user.password) {
      console.error("Email and password are required");
      return;
    }

    dispatch(handleLogin({ ...user }));

    if (!authState.error) {
      router.push("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <p>This is the login page</p>
      <div className={styles.input_div}>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
      </div>
      <div className={styles.input_div}>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <button onClick={handleSubmit}>Login</button>
      <div style={{ margin: "10px" }}>
        {authState.error && (
          <p style={{ color: "#ff0000" }}>{authState.errorMsg}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
