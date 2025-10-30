# 🛡️ BimaBondhu — Life Insurance Management Platform

**BimaBondhu** is a full-stack life insurance management platform built with the **MERN stack**, **Firebase Authentication**, and **Stripe**.
It allows users to browse and filter insurance policies, generate personalized quotes, connect with agents, and apply for policies online.
Customers can make secure payments, track applications, and manage approved policies, while admins and agents manage policy assignments and content.


<!-- <img src="https://i.ibb.co.com/W4PBbjjV/Screenshot-2025-08-09-225322.png" alt="BimaBondhu" width="700"/> -->
---

## 🌐 Live Project
**Frontend (Live)**: [https://bimabondu.web.app](https://bimabondu.web.app)  
**Backend Repository**: [BimaBondhu Server Repo](https://github.com/DevByDipto/BimaBondhu-server)

---

### Admin Credentials
- email: admin@gmail.com
- pass: 123456Aa
### Agent Credentials
- email: 1agent@gmail.com
- pass: 123456Aa
### User Credentials
- email: user@gmail.com
- pass: 123456Aa

---

## 🛠 Technologies Used

### **Frontend**
- React, React Router
- Tailwind CSS
- React Hook Form
- TanStack Query
- React Helmet Async
- React Select
- React Quill (Rich Text Editor)

### **Backend**
- Node.js, Express.js
- MongoDB (Atlas)
- Firebase Authentication (Email/Password + Google)
- Stripe Payment Integration
- JWT for API authentication
- Multer or Cloudinary/ImgBB for image upload

---

## 🚀 Core Features
- **Role-based access** (Admin / Agent / Customer)
- Policy browsing, filtering, and pagination
- Quote generator (inputs: Age, Coverage, Duration, Smoker, etc.)
- Policy application form with admin management
- Agent assignment & agent dashboard
- Blog section — create, edit, delete (Agent & Admin)
- Customer reviews & homepage testimonials
- Stripe payment & transaction logging
- JWT-protected API routes (401/403 handling)
- PDF download for approved policies

---

## 📦 Main Dependencies

### **Client**
```
react, react-dom, react-router-dom
@tanstack/react-query
react-hook-form
axios
firebase
react-helmet-async
react-quill
tailwindcss, autoprefixer, postcss
react-select
```

### **Server**
```
express
mongoose
jsonwebtoken
bcryptjs
dotenv
stripe
multer
```

---

## 🖥 How to Run Locally

### 1️⃣ Clone the repositories
```bash
git clone CLIENT_REPO_URL
git clone SERVER_REPO_URL
```

### 2️⃣ Client Setup
```bash
cd client
npm install
```
- Create `.env.local` file and add the **Client Environment Variables** (see below).
- Start development server:
```bash
npm run dev
```

### 3️⃣ Server Setup
```bash
npm install
```
- Create `.env` file and add the **Server Environment Variables** (see below).
- Start server:
```bash
npm run dev
```

---

## 🔐 Environment Variables

### **Client** (`.env.local`)
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_sender_id
VITE_appId=your_firebase_app_id
VITE_IMAGE_UPLOAD_KEY=your_imgbb_or_cloudinary_api_key
VITE_API_BASE_URL=your_backend_api_base_url
VITE_PAYMENT_KEY=your_stripe_or_sslcommerz_public_key
```

### **Server** (`.env`)
```env
PORT=3000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET_KEY=your_jwt_secret
PAYMENT_GETWAYKEY=your_stripe_or_sslcommerz_secret_key
```
