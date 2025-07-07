import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const AdminPanel = () => {
  const [scriptSnippet, setScriptSnippet] = useState("");
  const [page, setPage] = useState("home");
  const [placement, setPlacement] = useState("head");
  const [scripts, setScripts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const apiBase = `${BASE_URL}api/ad-tag`;

  // Fetch scripts
  const fetchScripts = async () => {
    try {
      const res = await axios.get(`${apiBase}/${page}`);
      setScripts(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchScripts();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { script_snippet: scriptSnippet, page, placement };
    try {
      if (editingId) {
        await axios.put(`${apiBase}/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post(apiBase, payload);
        alert("Tag updated successfully!");
      }
      setScriptSnippet("");
      fetchScripts();
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setScriptSnippet(item.script_snippet);
    setPlacement(item.placement);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBase}/${id}`);
      fetchScripts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>🛠️ Creator Admin Panel</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Page:</label>
          <select
            value={page}
            onChange={(e) => setPage(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="home">Home</option>
            <option value="course">Course</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Placement:</label>
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="head">Head</option>
            <option value="body">Body</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            Script Snippet:
          </label>
          <textarea
            value={scriptSnippet}
            onChange={(e) => setScriptSnippet(e.target.value)}
            style={{
              width: "100%",
              minHeight: "80px",
              maxHeight: "300px",
              resize: "vertical",
              padding: "8px",
              fontFamily: "monospace",
              fontSize: "14px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            placeholder="Paste your ad or retargeting script here"
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update" : "Add"} Script
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>🧾 Existing Scripts for "{page}"</h3>
      {scripts.length === 0 ? (
        <p style={{ color: "#666" }}>No scripts added yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {scripts.map((item) => (
            <li
              key={item._id}
              style={{
                backgroundColor: "#f1f1f1",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              <code
                style={{
                  display: "block",
                  whiteSpace: "pre-wrap",
                  fontSize: "13px",
                }}
              >
                {item.script_snippet.slice(0, 200)}
                {item.script_snippet.length > 200 ? "..." : ""}
              </code>
              <div style={{ marginTop: "8px", fontSize: "13px" }}>
                Placement: <strong>{item.placement}</strong>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    padding: "6px 12px",
                    marginRight: "8px",
                    border: "none",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
