import React, { useState, useEffect } from "react";
import axios from "axios";
import AdTagForm from "./AdTagForm";

function AdTagList() {
  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState(null);

  const fetchTags = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ad-tag/all");
      setTags(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        await axios.delete(`http://localhost:5000/api/ad-tag/${id}`);
        fetchTags();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <AdTagForm
        editingTag={editingTag}
        fetchTags={fetchTags}
        clearEditing={() => setEditingTag(null)}
      />
      <hr />
      <h2>Stored Tags</h2>
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Page</th>
            <th>Platform</th>
            <th>Title</th>
            <th>Description</th>
            <th>Keywords</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag._id}>
              <td>{tag.page}</td>
              <td>{tag.platform}</td>
              <td>{tag.tags.title}</td>
              <td>{tag.tags.description}</td>
              <td>{tag.tags.keywords.join(", ")}</td>
              <td>
                <button onClick={() => handleEdit(tag)}>Edit</button>
                <button
                  onClick={() => handleDelete(tag._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdTagList;
