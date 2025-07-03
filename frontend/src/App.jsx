import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div>
        <Link to="/">Home</Link> |<Link to="/course">Course</Link> |
        <Link to="/admin">Admin Panel</Link>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
