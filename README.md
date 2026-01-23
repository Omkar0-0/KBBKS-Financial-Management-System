## Frontend – KBBKS Financial Management System

This repository contains the **frontend application** for the **KBBKS Financial Management System (FMS)**, developed for an NGO to digitally manage financial operations such as expenses, vendor payments, and financial dashboards.

## Project Overview

KBBKS-FMS is designed to help NGOs manage:
- Expenses and bills
- Vendor (payee) records
- Expense and payment entries
- Financial summaries and dashboards

This frontend application provides the **user interface layer** of the system.

---

### Tech Stack
- React
- Vite
- JavaScript

## Project Setup (How to Run Locally)

Follow the steps below to run the project on your system:

### 1. Clone the repository
```bash
git clone <repository-url>
```

### 2. Navigate to the project folder
```bash
cd kbbks-fms-frontend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```

The application will run at:
```
http://localhost:5173
```
---

## Folder Structure

```
src/
├── components/    # Header, Sidebar, Footer
├── layouts/       # Main layout wrapper
├── pages/         # Login, Dashboard, Vendor, Expense, Payment screens
├── services/      # API configuration (to be expanded)
├── assets/        # Static assets
├── App.jsx        # Application logic and navigation
└── main.jsx       # React entry point
```

---


