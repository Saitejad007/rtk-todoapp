"use client";

import React, { useState } from "react";
import styles from "../auth.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    console.log("User", user);
    // router.push("/");
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
        <input type="text" name="email" onChange={handleChange} />
      </div>
      <div className={styles.input_div}>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
