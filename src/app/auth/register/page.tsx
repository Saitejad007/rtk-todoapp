"use client";

import React, { useState } from "react";
import styles from "../auth.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "@/app/lib/redux/slices/authSlice";
import { AppDispatch } from "@/app/lib/redux/store";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: any) => state.authReducer);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    await dispatch(handleRegister({ ...user }));

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
        <label>First Name</label>
        <input type="text" name="firstName" onChange={handleChange} />
      </div>
      <div className={styles.input_div}>
        <label>Last Name</label>
        <input type="text" name="lastName" onChange={handleChange} />
      </div>
      <div className={styles.input_div}>
        <label>Email</label>
        <input type="text" name="email" onChange={handleChange} />
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

export default Register;
