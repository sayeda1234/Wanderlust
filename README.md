# 🌍 Wanderlust — Travel Listings & Booking Platform

A full‑stack web application for discovering, listing, and reviewing travel stays. Users can explore properties, create listings, upload images, and leave reviews with secure authentication.

---

## 🚀 Features

* 👤 User Authentication (Register / Login / Logout)
* 🏨 Create, Edit & Delete Property Listings
* 🖼️ Image Uploads with Cloud Storage
* ⭐ Reviews & Ratings System
* 🔐 Secure Sessions & Flash Messages
* 🗺️ RESTful Routing Structure
* 🎨 Clean UI with EJS Templates

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS Templating

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Authentication

* Passport.js
* passport-local
* express-session

### File Uploads

* Multer
* Cloudinary

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root folder:

```
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

### 4️⃣ Start MongoDB

Make sure MongoDB is running locally:

```
mongod
```

### 5️⃣ Run the server

```
node app.js
```

Server will start at:

```
http://localhost:3000
```

---

## 📸 Image Uploads

Images are stored using Cloudinary cloud storage and linked to listings.

---

## 📄 License

This project is for educational purposes.

---

## 👩‍💻 Author

**Sayeda**
Full‑Stack Developer (MERN)
