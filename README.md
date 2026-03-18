# Foodies-Gram

**A real-time social platform for sharing food experiences — built with React, Firebase, and a custom hooks architecture.**

> React · Firebase · Framer Motion · Tailwind CSS · Firebase Hosting

**Live Demo:** [Foodies-Gram on Firebase Hosting](https://github.com/mostafarawhy/Foodies-Gram)

---

## Why I Built This

I built Foodies-Gram to explore what it takes to ship real-time social features — live notifications, instant feed updates, and upload progress — in a React app without a custom backend. Firebase was the right call: it handles auth, a real-time database, file storage, and hosting under one SDK, letting me move fast and focus entirely on product logic. The deeper engineering goal was to establish a custom hooks architecture where every Firebase concern lives in its own composable hook, keeping UI components clean and data logic independently structured — a pattern I wanted to practice at the scale of a real, deployed product.

---

## Features

### Social Feed with Image Grid
A masonry-style grid displays all uploaded food posts in real time. Images are preloaded before rendering to prevent layout jumps. Posts update live across all connected clients via Firestore's `onSnapshot` listener — no polling, no manual refresh.

### Image Upload with Real-Time Progress Bar
Users upload JPEG or PNG files through a file input. The upload uses Firebase Storage's `uploadBytesResumable`, which exposes a progress event stream. A Framer Motion-animated progress bar grows in real time as the file transfers. When the upload completes, the image document is written to Firestore and appears in every connected feed instantly.

### Likes System
Each post tracks a like count and an `interactedAccounts` map. Clicking the heart icon toggles a like using Firestore's atomic `increment()` and `deleteField()` operations — no race conditions. The heart icon color reflects the current user's like status on every render.

### Comments System
Users can leave comments on any post via a full-screen modal. Comments are stored as an array on the image document. The comment author sees a delete button; other users do not. Comment submission also triggers a real-time notification to the post owner.

### Real-Time Notifications
When another user likes or comments on your post, a notification is written to your notifications document in Firestore. The `NotificationDropDown` listens to that document via `onSnapshot` and updates in real time without any page refresh. The bell icon shows an unread count badge. Opening the dropdown starts a 1.4-second timer that marks all notifications as read. Each notification links back to the relevant post via URL query parameters.

### Google OAuth
Sign-in is handled by `@react-oauth/google`. After the OAuth flow, the app fetches the user's profile from Google's userinfo endpoint and persists it to both Firestore and `localStorage`. The user document is created once on first login; subsequent logins restore from the existing document.

### Framer Motion Animations
- Modal image slides down from off-screen (`y: "-100vh"` → `0`)
- Upload progress bar width animates from 0 to the actual upload percentage
- Notification items fade in and slide down with `AnimatePresence` controlling mount/unmount

---

## Tech Stack

| Technology | Version | Why |
|---|---|---|
| **React** | 18.2.0 | Functional components and hooks as the foundation for composable UI |
| **Vite** | 5.1.4 | Fast dev server and build tool; near-instant HMR during development |
| **React Router DOM** | 6.22.3 | Client-side routing with query parameter support for deep-linking into posts |
| **Tailwind CSS** | 3.4.1 | Utility-first styling with a custom food-themed color palette |
| **Firebase** | 10.8.1 | Collapses auth, real-time database, file storage, and hosting into one SDK — see below |
| **Framer Motion** | 11.0.8 | Production-quality animations without writing custom CSS keyframes or managing animation state manually |
| **@react-oauth/google** | 0.12.1 | Google OAuth with a single component; handles the token flow and exposes user info cleanly |
| **React Icons** | 5.0.1 | Consistent icon set without bundling full icon fonts |
| **Axios** | 1.6.8 | Used to fetch user profile data from Google's userinfo API after OAuth |

### Firebase — why it replaced a custom backend entirely

Firebase was chosen because it collapses four backend concerns into one SDK with zero server setup:

- **Firestore** — the database. Stores users, image posts, and notifications as documents. Its `onSnapshot` listeners are what make the feed and notifications update in real time — data changes propagate to every subscribed client immediately.
- **Firebase Storage** — stores uploaded images. Its `uploadBytesResumable` API provides a progress event stream, which drives the animated progress bar.
- **Firebase Authentication** — manages sessions. Google OAuth tokens are verified by Firebase, so no auth server is needed.
- **Firebase Hosting** — serves the production build. The same Firebase CLI that configures the database also deploys the frontend — one tool for the entire stack.

---

## Architecture

### Custom Hooks Pattern

All Firebase logic lives in six custom hooks. UI components import the hook they need, call it, and render the result. No component reaches into Firebase directly.
```
src/hooks/
├── useUser.js
├── useFirestore.js
├── useStorage.js
├── useUpdateFireStore.js
├── useNotification.js
└── useInteraction.js
```

This is an intentional architectural decision, not an accidental one. Each hook owns exactly one Firebase concern. The separation means:

- **UI components stay pure.** `ImageGrid` renders a grid. It does not know what Firestore is.
- **Hooks are independently debuggable.** If notifications break, the investigation starts and ends in `useNotification.js` — no need to trace through component trees.
- **Logic is reusable without duplication.** Any component that needs the image feed calls `useFirestore("images")`. The subscription is defined once.

This mirrors how experienced React engineers structure apps at scale: data concerns in hooks, rendering concerns in components, shared state in context.

---

### Hook Reference

#### `useFirestore(collection)`
Subscribes to a Firestore collection with a real-time `onSnapshot` listener ordered by `createdAt` descending. Returns `{ docs, isloading }`. Used by `ImageGrid` and `CommentBox` to power live-updating data without any manual refresh logic. Unsubscribes on component unmount.

#### `useStorage(file)`
Triggers a `uploadBytesResumable` upload when called with a file. Tracks `progress` (0–100) from the upload event stream, writes the completed image document to the `images` Firestore collection, and returns `{ progress, url, error }`. `ProgressBar` consumes `progress` to drive its Framer Motion animation.

#### `useNotification(userId)`
Opens an `onSnapshot` listener on the authenticated user's notifications document. Returns `{ notificationsArray }` in reverse-chronological order. Drives the `NotificationDropDown` badge count and notification list in real time.

#### `useInteraction()`
Returns `{ addNewInteraction, readNotifications }`. `addNewInteraction` is called on every like or comment — it checks whether a notification already exists for that action (to prevent duplicates), then writes a new notification object to the post owner's notifications document. `readNotifications` marks all entries as `read: true` when the dropdown opens.

#### `useUpdateFireStore()`
Returns `{ likesUpdate, updateComment, deleteComment }`. Handles all mutations to image documents:
- `likesUpdate` uses `increment()` and `deleteField()` for atomic like toggling
- `updateComment` appends a comment object to the comments array
- `deleteComment` validates that the requesting user is the comment author before removal

#### `useUser()`
Returns `{ addUser }`. Called on login to either create a new user document in the `users` collection or confirm the existing one. Also initializes an empty notifications document for new users.

---

### State Management

Two React Contexts manage global state — no Redux, no external state library.

- **`GlobalContext`** — UI state: which image is selected, whether the modal is open, whether the login modal is open, mobile menu toggle.
- **`GlobalUserContext`** — Auth state: the current user object, persisted to `localStorage` so sessions survive page refreshes.

Component-level state is used only for ephemeral UI concerns (file input, comment text, hover state).

---

### Data Flow
```
User logs in (Google OAuth)
  → profile fetched from Google API
  → useUser creates/confirms Firestore user document
  → user stored in GlobalUserContext + localStorage

User uploads image
  → useStorage uploads file to Firebase Storage
  → progress events animate ProgressBar via Framer Motion
  → on complete: image document written to Firestore images collection
  → useFirestore onSnapshot fires → ImageGrid re-renders with new post

User likes a post
  → useUpdateFireStore.likesUpdate() atomically increments like count
  → useInteraction.addNewInteraction() writes notification to post owner's document
  → post owner's useNotification onSnapshot fires → NotificationDropDown updates in real time
```

---

## Key Engineering Decisions

**Real-time Firestore listeners over polling.** Both the image feed and the notification system use `onSnapshot` subscriptions. Every connected client sees updates within milliseconds of a write — no polling interval, no stale data, no manual fetch-on-focus.

**Atomic like operations.** Firestore's `increment()` and `deleteField()` ensure like counts stay consistent under concurrent updates. A naive read-modify-write would create race conditions when multiple users like simultaneously.

**Firebase Storage resumable uploads.** `uploadBytesResumable` was chosen over the simpler `uploadBytes` specifically because it exposes a progress event stream. That stream is the only reason the upload progress bar can animate accurately — it's not a fake timer.

**Query parameters for notification deep-links.** When a user clicks a notification, they navigate to `/home-profile?imageUrl=...&imageId=...`. `App.jsx` reads these params and opens the relevant modal automatically. This lets notifications link directly to specific posts without a dedicated post route.

**Component composition over monoliths.** `Modal` renders a comment input and delegates comment display to `CommentBox`. `Home` renders the layout shell and delegates content to `ImageGrid` and `UploadForm`. Each component has one job.

---

## What I'd Do Differently

**TypeScript.** The custom hooks have clear return shapes and the Firestore data has a consistent structure — both are exactly the kind of code that benefits most from types. Without them, the data contracts between hooks and components exist only by convention.

**More granular commit history.** The repository has one initial commit. Meaningful commits at feature boundaries would make the build progression readable and demonstrate the order in which features were designed.

**Replace Facebook OAuth with a more reliable provider.** The Facebook login integration requires a Facebook App ID that isn't configured, making it non-functional without additional setup. GitHub OAuth or email/password would be simpler to ship and easier for users to trust.

**Pagination on the feed.** `useFirestore` currently fetches the entire `images` collection on every subscription. As the collection grows, this becomes expensive. A cursor-based pagination approach with Firestore's `startAfter()` would load images in pages.

---

## Setup

### Prerequisites
- Node.js v18+
- A Firebase project with Firestore, Storage, and Authentication enabled
- A Google Cloud OAuth 2.0 client ID

### 1. Clone and install
```bash
git clone https://github.com/mostafarawhy/Foodies-Gram.git
cd Foodies-Gram
npm install
```

### 2. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project
2. Enable **Firestore Database** (start in production mode)
3. Enable **Firebase Storage**
4. Enable **Authentication** → Sign-in method → Google

### 3. Configure Firestore collections

The app expects three top-level collections — they are created automatically on first use:
- `images` — one document per post
- `users` — one document per user (keyed by Google `sub`)
- `notifications` — one document per user containing a `notifications` array

### 4. Set environment variables

Create a `.env` file in the project root:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Then update `src/firebase/config.js` to read from these environment variables.

### 5. Run locally
```bash
npm run dev
```

App runs at `http://localhost:3000`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain (e.g. `project.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket (e.g. `project.appspot.com`) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 client ID from Google Cloud Console |

---

## Deployment

Foodies-Gram is deployed on **Firebase Hosting**.
```bash
npm run build
firebase deploy
```

Firebase CLI reads `firebase.json` for hosting configuration and `.firebaserc` for the target project.

---

## Screenshots

### Login Page
![Login Homepage](./Screenshots/Screenshot%202025-06-03%20at%203.43.32%20AM.png)

### Google Sign-In
![Login with Google](./Screenshots/Screenshot%202025-06-03%20at%203.44.28%20AM.png)

### Upload Progress Bar
![Upload progress bar](./Screenshots/Screenshot%202025-06-03%20at%204.01.19%20AM.png)

### Notifications Dropdown
![Notification preview](./Screenshots/Screenshot%202025-06-03%20at%204.02.04%20AM.png)
![Notification preview](./Screenshots/Screenshot%202025-06-03%20at%204.03.25%20AM.png)

### Comment Modal
![Commenting](./Screenshots/Screenshot%202025-06-03%20at%204.02.54%20AM.png)

### Feed
![Homepage](./Screenshots/Screenshot%202025-06-03%20at%204.03.12%20AM.png)

---

Built by [Mostafa Rawhy](https://github.com/mostafarawhy) · [LinkedIn](https://www.linkedin.com/in/mostafa-rawhy-b7ab522b2/)