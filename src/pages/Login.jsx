import React from "react";
import { useState } from "react";
import api from "../api";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [f, setF] = useState({ username:"", email:"", password:"" });

  const submit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/auth/login" : "/auth/register";
    const body = isLogin ? { email: f.email, password: f.password } : f;
    const { data } = await api.post(url, body);
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div 
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
      }}>
        <div
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}>
      <h2>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
      <form onSubmit={submit}>
        {!isLogin && (
          <input placeholder="Username" value={f.username}
            onChange={e=>setF({...f, username:e.target.value})} required />
        )}
        <input placeholder="Email" value={f.email}
          onChange={e=>setF({...f, email:e.target.value})} 
          style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}/>
        <input type="password" placeholder="Password" value={f.password}
          onChange={e=>setF({...f, password:e.target.value})} 
           style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}/>
        <button type="submit"
         style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#6bd370ff",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
            >{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={()=>setIsLogin(!isLogin)}
        style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#1C80C3",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
          }}>
        {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
      </button>
    </div>
    </div>
  );
}
