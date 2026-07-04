# 💳 SpendWise

**SpendWise** is a modern personal funds management web application built with **Next.js** that helps users track their **income, expenses, transfers, and spending habits** with clean analytics and a minimal, intuitive UI.

The goal of SpendWise is simple:

> **Give you complete clarity on where your money comes from and where it goes.**

---

## 🚀 Features

### 🔐 Authentication

* Secure sign up & login
* Session-based authentication
* Protected routes for user data

---

### 💰 Funds & Transactions

* Track **Inflows (Income)** and **Outflows (Expenses / Transfers)**
* Add, edit, and delete transactions
* Assign categories, people, and notes
* Track spending with proper dates

---

### 🗂 Categories Management

* Default expense categories (Food, Shopping, Bills, etc.)
* Create custom categories
* Assign colors and icons to categories

---

### 👤 People / Payees

* Track who you send money to
* View total amount sent per person
* Transaction history per person

---

### 📊 Analytics & Insights

* Weekly, monthly, and yearly analysis
* Interactive charts and graphs
* Spending breakdown by category
* Inflow vs outflow comparison

---

### 🧾 Dashboard Overview

* Current balance summary
* Total inflows and outflows
* Recent transactions
* Visual financial snapshot

---

### ⚙️ Settings

* Profile management
* Currency and date preferences
* Light / Dark mode
* Export data (CSV)

---

## 🧭 Pages & Routes

| Route               | Description        |
| ------------------- | ------------------ |
| `/login`            | User login         |
| `/register`         | User registration  |
| `/dashboard`        | Financial overview |
| `/transactions`     | All transactions   |
| `/transactions/new` | Add transaction    |
| `/analytics`        | Charts & analysis  |
| `/categories`       | Manage categories  |
| `/people`           | Payees list        |
| `/people/[id]`      | Person details     |
| `/settings`         | User preferences   |

---

## 🛠 Tech Stack

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Recharts / Chart.js**
* **Zustand** (state management)

### Backend

* **Next.js API Routes**
* **Prisma ORM**
* **PostgreSQL**

### Authentication

* **NextAuth.js**

---

## 📁 Project Structure

```txt
app/
 ├── (auth)/
 │   ├── login/
 │   └── register/
 ├── (app)/
 │   ├── dashboard/
 │   ├── transactions/
 │   ├── analytics/
 │   ├── categories/
 │   ├── people/
 │   └── settings/
 ├── layout.tsx
 └── page.tsx
```

---

## 🗄 Database Models (High-Level)

* User
* Transaction
* Category
* Person (Payee)
* Account (optional)

---

## 🎨 Design Philosophy

* Minimal and clean UI
* Focus on readability and clarity
* Soft colors and smooth animations
* Mobile-first responsive layout

---

## 🧠 Future Enhancements

* Budget limits per category
* Recurring transactions
* AI-powered spending insights
* Multi-currency support
* Mobile app version

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open `http://localhost:3000` to view the app.

---

## 📌 Project Status

🚧 **Currently under active development**

---

## 📄 License

This project is for personal and educational use.

---

## ✨ Spend Smart. Live Wise.

**SpendWise** helps you stay in control of your finances with confidence and clarity.
