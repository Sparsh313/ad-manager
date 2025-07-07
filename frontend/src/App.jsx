import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div>
      <Link to="/home">Home</Link> |<Link to="/course">Course</Link> |
      <Link to="/">Admin Panel</Link>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
    </div>
  );
}

export default App;
