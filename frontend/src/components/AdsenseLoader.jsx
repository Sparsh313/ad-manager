import React, { useEffect } from "react";
import axios from "axios";

function AdSenseLoader({ page }) {
  useEffect(() => {
    // let isMounted = true;

    const loadAdSense = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ad-tag/${page}`);
        const data = res.data;

        const validAdSenseObj = data.find(
          (item) => item.apiKey && item.apiKey.trim() !== ""
        );

        if (!validAdSenseObj) {
          console.warn("❌ No valid AdSense Publisher ID for page:", page);
          return;
        }

        const apiKey = validAdSenseObj.apiKey;

        // Clean existing script first
        const existingScript = document.querySelector(
          'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
        );
        if (existingScript) {
          document.head.removeChild(existingScript);
          console.log("🧹 Old script removed");
        }

        // Delay injection slightly to ensure DOM is ready
        setTimeout(() => {
          const script = document.createElement("script");
          script.src =
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
          script.async = true;
          script.crossOrigin = "anonymous";
          script.setAttribute("data-ad-client", apiKey);
          script.setAttribute("data-checked-head", "true");

          document.head.appendChild(script);
          console.log("📌 Head children now:", [...document.head.children]);
          // console.log("✅ Injected AdSense script for:", page, apiKey);
        }, 100); // slight delay helps in fast React remount
      } catch (err) {
        console.error("🚨 AdSense load failed:", err);
      }
    };

    loadAdSense();

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
        console.log("🧹 Removed script during cleanup");
      }
    };
  }, [page]);

  return null;
}

export default AdSenseLoader;
