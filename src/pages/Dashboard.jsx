import { useEffect, useState } from "react";
import api from "../api";
import React from "react";

export default function Dashboard() {
  const [d, setD] = useState(null);
  useEffect(() => {
    api.get("/dashboard/summary").then((res) => setD(res.data));
  }, []);
  if (!d) return (
    <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#666" }}>
      Loading...
    </div>
  );
  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>Dashboard</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        <Card title="Total Products" value={d.totalProducts} />
        <Card title="Low Stock (≤5)" value={d.lowStock} />
        <Card title="Total Orders" value={d.totalOrders} />
        <Card title="Revenue (completed)" value={`$${d.revenue}`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>{title}</div>
      <div style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>{value}</div>
    </div>
  );
}