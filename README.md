# 🛡️ LegacyVault

> A secure Digital Will Management System built with Node.js, Express.js, MongoDB, and JWT Authentication.

LegacyVault enables users to securely create, manage, and share digital wills with trusted nominees while maintaining enterprise-level authentication, session management, and security.

---

# 🚀 Features

## 🔐 Authentication

- ✅ User Registration
- ✅ Secure Password Hashing (bcrypt)
- ✅ Email & Password Login
- ✅ OTP-based Login Verification
- ✅ Email OTP using Resend
- ✅ JWT Access Token Authentication
- ✅ JWT Refresh Token Authentication
- ✅ Protected Routes Middleware
- ✅ Current User API
- ✅ Secure Refresh Token Validation
- ✅ Refresh Token Hashing
- ✅ Session Management
- ✅ Automatic Session Expiry (TTL)

---

## 🛡️ Security

- Password Hashing using bcrypt
- OTP Hashing before database storage
- Refresh Token Hashing
- JWT Authentication
- MongoDB TTL Indexes
- Centralized Error Handling
- Input Validation using Zod
- Service + Repository Architecture
- Clean Layered Architecture

---

## 🏗️ Project Architecture

```
src/
│
├── config/
├── constants/
├── controllers/
├── emails/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── validators/
```

---

# 🛠️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT
- bcrypt
- Resend (Email OTP)

### Validation

- Zod

---

# 📌 Current Progress

## ✅ Completed

- User Registration
- Login System
- OTP Generation
- Email OTP
- OTP Verification
- JWT Authentication
- Refresh Token
- Session Management
- Protected Routes
- Current User API

---

## 🚧 Coming Soon

- Logged-in Devices
- Logout Current Device
- Logout From All Devices
- Email Verification
- Forgot Password
- Password Reset
- Digital Will Module
- Nominee Management
- Emergency Access
- Notifications
- Admin Dashboard

---

# ⚙️ Installation

```bash
git clone <repository-url>

cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

ACCESS_TOKEN_SECRET=YOUR_SECRET
ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_SECRET=YOUR_SECRET
REFRESH_TOKEN_EXPIRES_IN=30d

RESEND_API_KEY=YOUR_RESEND_API_KEY

EMAIL_FROM=YOUR_EMAIL
```

Run the server

```bash
npm run dev
```

---

# 📖 API Modules

### Authentication

- Register
- Login
- Verify OTP
- Refresh Token
- Current User

---

# 🎯 Vision

LegacyVault aims to provide a secure and production-ready Digital Will platform where users can safely manage their digital assets, nominate trusted individuals, and ensure seamless digital inheritance with enterprise-grade security.

---

# 👨‍💻 Author

**Mohd Danish**

If you found this project useful, consider giving it a ⭐ on GitHub.
