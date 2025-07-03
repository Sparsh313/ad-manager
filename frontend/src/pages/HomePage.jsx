import React, { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  useEffect(() => {
    const cleanScript = (raw) =>
      raw
        .replace(/<script.*?>/gi, "")
        .replace(/<\/script>/gi, "")
        .trim();

    const fetchAndInjectScripts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ad-tag/home");
        const scripts = res.data;

        scripts.forEach((script) => {
          const scriptId = `home-script-${script._id}`;
          if (document.getElementById(scriptId)) return;

          const scriptEl = document.createElement("script");
          scriptEl.type = "text/javascript";
          scriptEl.textContent = cleanScript(script.script_snippet);
          scriptEl.id = scriptId;
          scriptEl.dataset.page = "home";

          if (script.placement === "head") {
            document.head.appendChild(scriptEl);
          } else {
            document.body.appendChild(scriptEl);
          }
        });
      } catch (err) {
        console.error("Failed to inject HomePage scripts", err);
      }
    };

    fetchAndInjectScripts();

    return () => {
      // ✅ Remove only scripts from "home" page
      document
        .querySelectorAll('[data-page="home"]')
        .forEach((el) => el.remove());
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 Home Page</h1>
      <p>
        This is the Home Page. Scripts will be loaded and unloaded as per route.
      </p>
    </div>
  );
};

export default HomePage;
