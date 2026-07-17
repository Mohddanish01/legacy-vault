# 🛡️ LegacyVault

> A secure Digital Will Management System built with Node.js, Express.js, MongoDB, and JWT Authentication.

LegacyVault enables users to securely create, manage, and share digital wills with trusted nominees while maintaining enterprise-level authentication, session management, and security.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- Secure Login with Email OTP
- JWT Authentication (Access + Refresh Tokens)
- Refresh Token Rotation
- Session Management
- View Logged-in Devices
- Logout Current Device
- Logout All Devices

### 👤 Profile Management
- View Profile
- Update Profile
- Change Password
- Force Logout from All Devices after Password Change

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

## 🚀 Implemented APIs

### Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/verify-otp
- POST /auth/refresh-token
- GET /auth/me

### Sessions
- GET /auth/sessions
- DELETE /auth/sessions/:sessionId
- DELETE /auth/sessions

### Profile
- GET /profile
- PUT /profile
- PUT /profile/change-password
- Admin Dashboard

## 📋 Roadmap

- [x] Authentication
- [x] Session Management
- [x] Profile Management
- [ ] Nominee Management
- [ ] Digital Will Management
- [ ] Secure File Vault
- [ ] Emergency Access
- [ ] Admin Dashboard

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

# 🎯 Vision

LegacyVault aims to provide a secure and production-ready Digital Will platform where users can safely manage their digital assets, nominate trusted individuals, and ensure seamless digital inheritance with enterprise-grade security.

---

# 👨‍💻 Author

**Mohd Danish**

If you found this project useful, consider giving it a ⭐ on GitHub.
