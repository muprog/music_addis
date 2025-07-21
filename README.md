# 🎵 Music Addis MERN Stack Project

**Music Addis** is a full-stack MERN (MongoDB, Express, React, Node.js) application for uploading, editing, and playing music tracks. It uses Redux Toolkit with Redux Saga for state management and asynchronous actions.

## 🚀 Features

- User-friendly music upload and edit interface
- Audio and cover image file uploads
- Redux Toolkit + Redux Saga for robust state management
- Modern React UI with Emotion for styling
- Backend file storage and streaming
- Environment-based configuration for easy deployment

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd music_addis
```

### 2. Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 3. Environment Variables

**Backend (.env):**

```env
MONGO_URL=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:3000 # or your deployed frontend URL
```

**Frontend (.env):**

```env
REACT_APP_BACKEND_URI=http://localhost:5000 # or your deployed backend URL
```

### 4. Running Locally

#### Start the Backend

```bash
cd server
npm run dev
```

#### Start the Frontend

```bash
cd client
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000` by default.

---

## 🤖 AI Used in Development

- **ChatGPT (OpenAI):** Used for code assistance, debugging, and architectural suggestions.
