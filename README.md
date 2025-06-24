## Step 1: Research on Ad Manager Platforms

### 1> Google Ads & Google Ad Manager

Google Ads is a platform for advertisers to run paid campaigns across Google Search, YouTube, and partner websites. Google Ad Manager is used by publishers (site/app owners) to manage and display these ads on their properties.

- Ads are targeted based on user behavior, search history, location, and demographics.
- Publishers use ad tags (like `gtag.js`) to load ads dynamically on specific pages.
- Common use cases: showing banner ads, video ads, and tracking ad performance using Google Analytics.

---

### 2> YouTube Ads

YouTube Ads are managed through Google Ads. Advertisers can target users based on watch history, interests, and video content.

- Ads appear as pre-roll, mid-roll, or post-roll on YouTube videos.
- No ad code is required on external websites for YouTube Ads.

---

### 3> Facebook Ads (Meta Ads Manager)

Facebook and Instagram ads are managed through Meta Ads Manager.

- Advertisers can set a budget, define a target audience (based on age, location, interests, etc.), and track ad performance.
- For tracking and retargeting, websites can integrate the **Facebook Pixel**, a JavaScript snippet that monitors user interactions on the site.

---

### 4> Instagram Ads

Instagram Ads are an extension of Facebook Ads and are managed using the same Meta Ads Manager.

- Ads can be placed in Stories, Reels, and Feed.
- Targeting is highly specific using Meta’s user data.
- Pixel tracking helps in measuring conversions and user behavior.

# Step-2

# 🎯 Ad Manager Integration Demo (MERN)

A full-stack demo project that allows administrators to inject Google AdSense or Meta/Facebook Pixel tags dynamically based on pages using a custom tag and API management system. Useful for injecting general ads (e.g., for website CTR) and targeted ads (e.g., for specific courses).

---

## 📌 Features

- ✅ Admin panel to add and manage ad tags for each page
- 🧠 Dynamic meta tag injection (`title`, `description`, `keywords`)
- 🎯 Google AdSense script injection with dynamic `data-ad-client`
- 🧪 Tested with multiple pages and changing routes
- 💡 Scalable for Meta Pixel or any custom ad script
- 🔒 REST API to store, edit, and retrieve tag data from MongoDB

---

## 🏗️ Tech Stack

**Frontend**

- React (Vite)
- Axios
- React Router

**Backend**

- Node.js + Express
- MongoDB with Mongoose

---

## 📂 Folder Structure

frontend/
└── src/
├── components/
│ ├── AdSenseLoader.jsx # Dynamically injects Google AdSense script
│ ├── MetaTagInjector.jsx # Injects title, description, and meta tags
│ ├── AdTagForm.jsx # Admin form to add tags
│ ├── AdTagList.jsx # List of all tags
│ └── MetaPixel.jsx # (Placeholder for FB Pixel loader)
├── pages/
│ ├── AdminPanel.jsx
│ ├── CoursePage.jsx
│ └── HomePage.jsx
├── App.jsx
└── main.jsx

backend/
├── models/AdTag.js # Mongoose schema for ad tag data
├── routes/adTagcontroller.js # Controllers for ad tags
├── routes/adTagRoutes.js # CRUD routes for ad tags
└── server.js # Entry point with Express config

---

## 🚀 How It Works

### 🧩 1. Admin Adds a Tag

- Via `AdTagForm.jsx`, an admin can assign:
  - Page name (e.g., `home`, `course`, `about`)
  - Platform (e.g., `Google`, `Facebook`)
  - Tags: title, description, keywords
  - Optional: `apiKey` (e.g., AdSense Publisher ID)

### 🧠 2. Tag Injection on Page Load

- `MetaTagInjector.jsx` fetches tags by page name and injects them into the `<head>` of the DOM.

### 💰 3. AdSense Script Loader

- `AdSenseLoader.jsx` dynamically inserts:
  ```html
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" data-ad-client="your-id-here"></script>
  ```

✅ Injected Tags (Console):
arduino
Copy
Edit
{ title: "DSA", description: "DSA Sheet", keywords: ["DSA", "Coding", ...] }
✅ Injected AdSense script for: home

✅ DOM View (Production):
html
Copy
Edit

<head>
  <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" data-ad-client="ca-pub-xxxxxxxxxxxx"></script>
  <meta name="description" content="DSA Sheet, Best CS Courses" />
  ...
</head>

🙋‍♂️ Author
Sparsh Singh
Intern at [Your Company Name]
GitHub: @yourusername
