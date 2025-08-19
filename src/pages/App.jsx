import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "16px",
          padding: "12px 24px",
          borderBottom: "1px solid #eee",
          backgroundColor: "#f4f4f9",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
            fontWeight: "500",
            padding: "8px 12px",
            borderRadius: "4px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Menu
        </Link>
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
            fontWeight: "500",
            padding: "8px 12px",
            borderRadius: "4px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Sản phẩm
        </Link>
        <Link
          to="/orders"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
            fontWeight: "500",
            padding: "8px 12px",
            borderRadius: "4px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Đơn hàng
        </Link>
        <button
          onClick={logout}
          style={{
            marginLeft: "auto",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#FF4D4D",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#E63939")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF4D4D")}
        >
          Đăng xuất
        </button>
      </nav>
      <div
        style={{
          padding: "24px",
          backgroundColor: "#fff",
          minHeight: "calc(100vh - 60px)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}