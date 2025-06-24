import React from "react";
import MetaTagInjector from "../components/MetaTagInjector";
import AdSenseLoader from "../components/AdsenseLoader";
function HomePage() {
  return (
    <div>
      <MetaTagInjector page="homepage" />
      <AdSenseLoader page="homepage" />
      <h1>Welcome to Homepage</h1>
      <p>This is the homepage content.</p>

      {/* Ad slot */}
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

export default HomePage;
