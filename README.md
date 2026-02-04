# civic-issue-tracker
A simple blockchain-based system that lets citizens raise civic issues and track them transparently, ensuring accountability in local governance...


## 📄 Project Documentation
Detailed project documentation is available here:  
[View Full Documentation](docs/Civic_Issue_Tracker_Project_Documentation.md)


## 📑 Feature Specification
Detailed frontend and backend feature list is available here:  
[Feature Specification](docs/FEATURE_SPECIFICATION.md)

---

## 📂 Folder Structure

src/
├── app/ # Routes, pages, and layouts using Next.js App Router
├── components/ # Reusable UI components such as headers, forms, and cards
├── lib/ # Reserved for shared utilities, helpers, and configuration (future use)


### 📁 app/
- Manages application routing and layouts
- Supports server and client components
- Keeps page-level logic centralized

### 📁 components/
- Contains reusable UI components
- Promotes consistency across the application
- Reduces code duplication

### 📁 lib/
- Intended for utility functions, configurations, and shared logic
- Currently unused in Sprint #1 but created to support scalability in future sprints

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- npm

### Installation
```bash
npm install
```

### Run locally
```bash
npm run dev
```

## 🔍 Reflection: Why This Structure?

This folder structure follows Next.js best practices and keeps routing, UI components, and utilities clearly separated. It improves code readability and makes collaboration easier. As new features are added in future sprints, this structure will help the application scale while remaining clean and maintainable.
