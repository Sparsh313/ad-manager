import React from "react";
import MetaTagInjector from "../components/MetaTagInjector";
import AdSenseLoader from "../components/AdsenseLoader";

function CoursePage() {
  return (
    <div>
      <MetaTagInjector page="coursepage" />
      <AdSenseLoader page="coursepage" />
      <h1>Course Page</h1>
      <p>Explore our courses and start learning!</p>

      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "250px",
          backgroundColor: "#f7f7f7",
          border: "1px solid #ccc",
          textAlign: "center",
          lineHeight: "250px",
          fontWeight: "bold",
          color: "#888",
        }}
      >
        Google Ad Placeholder
      </ins>
    </div>
  );
}

export default CoursePage;
