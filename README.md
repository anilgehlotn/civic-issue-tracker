# Civic Issue Tracker

A simple blockchain-based system that lets citizens raise civic issues and track them transparently, ensuring accountability in local governance...

## 📄 Project Documentation

Detailed project documentation is available here:

- [Full Project Documentation](docs/Civic_Issue_Tracker_Project_Documentation.md)
- [Feature Specification](docs/FEATURE_SPECIFICATION.md)

## � Key Features

### 🏛️ For Administrators

- **Dashboard Overview**: Visual stats and recent issues at a glance.
- **Issue Management**: Filter issues by category (Roads, Waste, Lighting, Water) and status.
- **Staff Assignment**: Assign reported issues to specific Ward Staff members.
- **User Management**: Add new staff members and view all system users.
- **Admin Profile**: View personal details (Name, Department, Ward).

### 👷 For Staff

- **Personalized Dashboard**: View only issues assigned to you.
- **Status Updates**: Mark issues as 'In Progress' or 'Resolved' as work is completed.
- **Ward-Specific Views**: Focus on your designated area of responsibility.

### 🏙️ For Citizens (Public Interface)

- **Landing Page**: Transparent view of city-wide stats (Issues Resolved, Active Users).
- **Telegram Integration**: Direct link to report issues via a Telegram Bot (No app download needed).
- **Progress Tracking**: Real-time updates on reported issues.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: React Hooks & LocalStorage (Mock Backend)
- **Icons**: Heroicons / Custom SVG

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend-next
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `app/page.tsx`: Main Landing Page (Public).
- `app/pages/login`: Login portal for Officials.
- `app/pages/admin`: Administrator Dashboard.
- `app/pages/staff`: Staff Dashboard.
- `app/pages/all-users`: User management list.
- `components/`: Reusable UI components (Modals, etc.).
