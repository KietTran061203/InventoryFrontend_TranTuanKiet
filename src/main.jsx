import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./pages/App.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const isAuthed = () => !!localStorage.getItem("token");

const router = createBrowserRouter([
  { path: "/", element: isAuthed() ? <Navigate to="/dashboard" /> : <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "dashboard", element: isAuthed() ? <Dashboard /> : <Navigate to="/" /> },
      { path: "products", element: isAuthed() ? <Products /> : <Navigate to="/" /> },
      { path: "orders", element: isAuthed() ? <Orders /> : <Navigate to="/" /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
