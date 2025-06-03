# React + Vite
## 📸 Screenshots

### Login Homepage
![Login Homepage](./Screenshots/Screenshot%202025-06-03%20at%203.43.32 AM.png)

### Login with Google
![Login with Google](./Screenshots/Screenshot%202025-06-03%20at%203.44.28 AM.png)

### Homepage with progress uploading (progress bar)
![Homepage with progress uploading (progress bar)](./Screenshots/Screenshot%202025-06-03%20at%204.01.19 AM.png)

### Notification preview
![notification preview](./Screenshots/Screenshot%202025-06-03%20at%204.02.04 AM.png)
![Homepage](./Screenshots/Screenshot%202025-06-03%20at%204.03.12 AM.png)
![notification preview](./Screenshots/Screenshot%202025-06-03%20at%204.03.25 AM.png)

### Commenting
![Commenting](./Screenshots/Screenshot%202025-06-03%20at%204.02.54 AM.png)


Foodie's hub

# Foodie's Hub 🍜📸

**A Dynamic Social Platform for Food Enthusiasts**

*"Bon Appétit! Explore Food Dishes From All over The World"*

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Firebase Configuration](#firebase-configuration)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Foodie's Hub is a dynamic social media platform designed for food enthusiasts to share their culinary adventures and experiences seamlessly. With its intuitive interface and robust features, Foodie's Hub empowers users to capture and showcase their gastronomic journeys through captivating images, fostering a vibrant community of food lovers worldwide.

The platform enables users to discover, share, and connect over their passion for food, creating a visual feast of culinary experiences from around the globe.

## ✨ Features

### 🍽️ **Food Sharing & Discovery**
- Upload and share stunning photos of culinary creations
- Browse an endless feed of food experiences from the community
- Discover new recipes, cuisines, and dining spots
- Visual storytelling through high-quality food photography

### 💖 **Social Interaction**
- **Like System** - Express appreciation for amazing food posts
- **Comment System** - Share thoughts and engage in culinary discussions
- **Real-time Notifications** - Stay updated on interactions with your posts
- **User Profiles** - Showcase your culinary journey and food preferences

### 🔐 **Authentication & User Management**
- **Google OAuth Integration** - Seamless sign-in with Google accounts
- **Facebook Login Support** - Alternative social login option
- **Secure Authentication** - JWT-based session management
- **User Profiles** - Personalized experience for each food enthusiast

### 🎨 **UI/UX Excellence**
- **Responsive Design** - Optimized for all devices and screen sizes
- **Modern Interface** - Clean, Instagram-like food-focused design
- **Smooth Animations** - Framer Motion powered interactions
- **Intuitive Navigation** - Easy-to-use interface for all ages
- **Image Grid Layout** - Beautiful masonry-style food gallery

### 🔔 **Advanced Features**
- **Real-time Notifications** - Instant updates on likes, comments, and interactions
- **Image Upload System** - High-quality photo upload with Firebase Storage
- **Progress Tracking** - Visual feedback during uploads and interactions
- **Comment Threading** - Organized discussions under each food post
- **User Authentication States** - Secure session management

### 🚀 **Future Enhancements**
- **Interactive Maps** - Explore nearby restaurants and eateries
- **Google Ratings Integration** - View restaurant ratings and reviews
- **Recipe Sharing** - Share detailed recipes with ingredients and instructions
- **Food Categories** - Filter content by cuisine type, meal category, etc.
- **Social Following** - Follow favorite food creators
- **Advanced Search** - Find specific dishes, restaurants, or users

## 🛠 Tech Stack

### **Frontend Framework**
- **React 18.2.0** - Modern UI library with hooks and functional components
- **Vite 5.1.4** - Lightning-fast build tool and development server
- **React Router DOM 6.22.3** - Client-side routing and navigation
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid styling

### **Authentication & Social Login**
- **Google OAuth (@react-oauth/google)** - Secure Google authentication
- **Facebook Login (@greatsumini/react-facebook-login)** - Facebook social login
- **JWT Decode (jwt-decode)** - Token-based authentication handling

### **Backend & Database**
- **Firebase 10.8.1** - Complete backend-as-a-service platform
  - **Firestore Database** - Real-time NoSQL database for posts, users, and comments
  - **Firebase Storage** - Cloud storage for high-quality food images
  - **Firebase Authentication** - User management and security
  - **Firebase Hosting** - Fast and secure web hosting

### **UI/UX & Animations**
- **Framer Motion 11.0.8** - Production-ready motion library for React
- **React Icons 5.0.1** - Popular icon library for consistent iconography
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

### **HTTP & API Communication**
- **Axios 1.6.8** - Promise-based HTTP client for API requests
- **React Router DOM** - Single-page application routing

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **Vite Plugin SSR** - Server-side rendering capabilities
- **TypeScript Support** - Type definitions for React components

## 📁 Project Structure

```
FOODIE-SGRAM-HUB/
├── .github/
│   └── workflows/
│       └── firebase-hosting-pull-request.yml
├── functions/
│   ├── .eslintrc.js
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── node_modules/
├── public/
│   ├── 404.html
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── background-3.jpeg
│   │   ├── biege-gradient-backg.jpeg
│   │   ├── delete.svg
│   │   ├── logo-transparent-chef.png
│   │   └── menu.svg
│   ├── components/
│   │   ├── context/
│   │   ├── CommentBox.jsx
│   │   ├── Home.jsx
│   │   ├── HomePageLogin.jsx
│   │   ├── ImageGrid.jsx
│   │   ├── LoginButton.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Modal.jsx
│   │   ├── NavBar.jsx
│   │   ├── NotificationDropDown.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Skeleton.jsx
│   │   ├── StarRatings.jsx
│   │   ├── Title.jsx
│   │   ├── ToggleMenu.jsx
│   │   └── UploadForm.jsx
│   ├── Constants/
│   │   └── index.js
│   ├── firebase/
│   │   └── config.js
│   ├── hooks/
│   │   ├── useFirestore.js
│   │   ├── useInteraction.js
│   │   ├── useNotification.js
│   │   ├── useStorage.js
│   │   ├── useUpdateFireStore.js
│   │   └── useUser.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .eslintrc.cjs
├── .firebaserc
├── .gitignore
├── database.rules.json
├── firebase.json
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Firebase Account
- Google Developer Console Account (for OAuth)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/foodie-sgram-hub.git
cd foodie-sgram-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - **Authentication** (Google & Facebook providers)
   - **Firestore Database**
   - **Storage**
   - **Hosting** (optional)

3. Get your Firebase configuration from Project Settings

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

### 5. Firebase Configuration
Update `src/firebase/config.js` with your Firebase configuration:
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
```

### 6. Firestore Security Rules
Configure `database.rules.json`:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### 7. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `VITE_FACEBOOK_APP_ID` | Facebook app ID | Optional |

## 🔥 Firebase Configuration

### Authentication Setup
1. Navigate to Firebase Console → Authentication → Sign-in method
2. Enable **Google** provider
3. Add your domain to authorized domains
4. Optionally enable **Facebook** provider

### Firestore Database Setup
1. Create a Firestore database in production mode
2. Set up the following collections:
   - `posts` - Store food post data
   - `users` - Store user profiles
   - `comments` - Store post comments
   - `notifications` - Store user notifications

### Storage Setup
1. Set up Firebase Storage for image uploads
2. Configure storage rules for authenticated users
3. Create folders for organized file storage

## 📱 Screenshots & Features

### Landing Page
- **Hero Section** with "Bon Appétit!" greeting
- **Google Sign-in Integration** for seamless authentication
- **Beautiful Background** with food-themed imagery
- **Call-to-action** to explore food dishes from around the world

### Main Dashboard
- **Welcome Message** with personalized user greeting
- **Image Grid Layout** displaying food posts in a masonry style
- **Upload Interface** with drag-and-drop functionality
- **Navigation Bar** with notifications, work, and contact sections

### Social Features
- **Like System** with heart icons and like counters
- **Comment System** with threaded discussions
- **Real-time Notifications** dropdown with activity updates
- **User Interactions** including likes, comments, and post sharing

### Image Viewing & Interaction
- **Full-size Image Modal** for detailed food photo viewing
- **Comment Box** for adding experiences and thoughts
- **User Attribution** showing post creators
- **Delete Functionality** for post management

## 🎯 Key Features Demonstration

### Upload & Share
Users can easily upload high-quality food photos with descriptions, creating a visual diary of their culinary experiences.

### Social Engagement
The platform encourages community interaction through likes, comments, and real-time notifications, building connections among food enthusiasts.

### Personalized Experience
Each user has a personalized dashboard showing their posts, interactions, and notifications, creating a unique social media experience focused on food.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔒 Security Features

- **Firebase Authentication** with Google OAuth
- **Firestore Security Rules** for data protection
- **JWT Token Management** for secure sessions
- **Input Validation** and sanitization
- **Image Upload Security** with Firebase Storage rules

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Environment Setup
Ensure all environment variables are properly configured for production deployment.

---

**Foodie's Hub** - Where culinary passion meets social connection. Join our community of food lovers and share your gastronomic adventures! 🍽️✨

Getting StartedFollow these steps to set up the project:

Clone the Repository:

git clone https://github.com/mostafarawhy/Foodie-s-hub.gitInstall 

Dependencies:

npm install

Set up Firebase:

Navigate to the firebase/config.js file in your project.Replace YOUR_FIREBASE_API_KEY with your Firebase project API key.Replace other necessary Firebase configurations as needed. an the config needed

Set up Facebook Login:

Open the loginModal.jsx file in your project.Locate the section where the Facebook login configuration is set.Replace YOUR_FACEBOOK_APP_ID with your Facebook app ID.

Set up Google Login:

Open the homePagelogin.jsx file in your project.Locate the section where the google login configuration is set.Replace google_client with your google client ID.



Start the Development Server:

View the Application:Open your browser and navigate to http://localhost:3000 to view the application.
Usageits still under development and adding features and enhancing the ui

