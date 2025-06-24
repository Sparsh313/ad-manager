import React, { useState, useEffect } from "react";
import axios from "axios";

function AdTagForm({ editingTag, fetchTags, clearEditing }) {
  const [formData, setFormData] = useState({
    page: "",
    platform: "",
    tags: {
      title: "",
      description: "",
      keywords: "",
    },
    apiKey: "",
  });

  // Load form data if editing
  useEffect(() => {
    if (editingTag) {
      setFormData({
        page: editingTag.page,
        platform: editingTag.platform,
        tags: {
          title: editingTag.tags.title,
          description: editingTag.tags.description,
          keywords: editingTag.tags.keywords.join(", "),
        },
        apiKey: editingTag.apiKey,
      });
    }
  }, [editingTag]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["title", "description", "keywords"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        tags: { ...prev.tags, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      tags: {
        ...formData.tags,
        keywords: formData.tags.keywords.split(",").map((k) => k.trim()),
      },
    };

    try {
      if (editingTag) {
        // Update existing tag
        await axios.patch(
          `http://localhost:5000/api/ad-tag/${editingTag._id}`,
          finalData
        );
        alert("Tag updated successfully!");
        clearEditing(); // Reset editing state after update
      } else {
        // Create new tag
        await axios.post("http://localhost:5000/api/ad-tag", finalData);
        alert("Tag saved successfully!");
      }
      setFormData({
        page: "",
        platform: "",
        tags: { title: "", description: "", keywords: "" },
        apiKey: "",
      });
      fetchTags(); // Refresh table after submit
    } catch (error) {
      console.error(error);
      alert("Error saving tag");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>{editingTag ? "Edit Tag" : "Create Tag"}</h2>
      <input
        name="page"
        value={formData.page}
        placeholder="Page"
        onChange={handleChange}
      />
      <br />
      <br />
      <select name="platform" value={formData.platform} onChange={handleChange}>
        <option value="">Select Platform</option>
        <option value="Google">Google</option>
        <option value="Meta">Meta</option>
        <option value="YouTube">YouTube</option>
      </select>
      <br />
      <br />
      <input
        name="title"
        value={formData.tags.title}
        placeholder="Title"
        onChange={handleChange}
      />
      <br />
      <br />
      <textarea
        name="description"
        value={formData.tags.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        name="keywords"
        value={formData.tags.keywords}
        placeholder="Keywords (comma separated)"
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        name="apiKey"
        value={formData.apiKey}
        placeholder="API Key (optional)"
        onChange={handleChange}
      />
      <br />
      <br />
      <button type="submit">{editingTag ? "Update" : "Save"}</button>
      {editingTag && (
        <button
          type="button"
          onClick={clearEditing}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default AdTagForm;
