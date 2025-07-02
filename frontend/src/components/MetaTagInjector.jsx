import React, { useEffect } from "react";
import axios from "axios";

function MetaTagInjector({ page }) {
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ad-tag/${page}`);
        const dataArray = res.data;

        let allTitles = []; 
        let allDescriptions = [];
        let allKeywords = [];

        dataArray.forEach((item) => {
          const tags = item.tags;
          if (tags.title) allTitles.push(tags.title);
          if (tags.description) allDescriptions.push(tags.description);
          if (Array.isArray(tags.keywords)) allKeywords.push(...tags.keywords);
        });

        console.log(allTitles, allDescriptions, allKeywords);
        // Set merged values
        document.title = allTitles.join(" | ");

        const setMeta = (name, content) => {
          if (!content) return;
          let element = document.querySelector(`meta[name="${name}"]`);
          if (element) {
            element.setAttribute("content", content);
          } else {
            element = document.createElement("meta");
            element.name = name;
            element.content = content;
            document.head.appendChild(element);
          }
        };

        setMeta("description", allDescriptions.join(", "));
        setMeta("keywords", [...new Set(allKeywords)].join(", "));
      } catch (err) {
        console.error("Meta tag fetch failed:", err);
      }
    };

    fetchMeta();
  }, [page]);

  return null; 
}

export default MetaTagInjector;
