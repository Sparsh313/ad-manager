import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const CoursePage = () => {
  useEffect(() => {
    const cleanScript = (raw) =>
      raw
        .replace(/<script.*?>/gi, "")
        .replace(/<\/script>/gi, "")
        .trim();

    const apiBase = `${BASE_URL}api/ad-tag`;

    const fetchAndInjectScripts = async () => {
      try {
        const res = await axios.get(`${apiBase}/course`);
        const scripts = res.data;

        scripts.forEach((script) => {
          const scriptId = `course-script-${script._id}`;
          if (document.getElementById(scriptId)) return;

          const scriptEl = document.createElement("script");
          scriptEl.type = "text/javascript";
          scriptEl.textContent = cleanScript(script.script_snippet);
          scriptEl.id = scriptId;
          scriptEl.dataset.page = "course";

          if (script.placement === "head") {
            document.head.appendChild(scriptEl);
          } else {
            document.body.appendChild(scriptEl);
          }
        });
      } catch (err) {
        console.error("Failed to inject coursePage scripts", err);
      }
    };

    fetchAndInjectScripts();

    return () => {
      // ✅ Remove only scripts from "course" page
      document
        .querySelectorAll('[data-page="course"]')
        .forEach((el) => el.remove());
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 course Page</h1>
      <p>
        This is the course Page. Scripts will be loaded and unloaded as per
        route.
      </p>
    </div>
  );
};

export default CoursePage;
