import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  authDomain: "mostafa-firegram.firebaseapp.com",
  projectId: "mostafa-firegram",
  storageBucket: "mostafa-firegram.appspot.com",
};

// initialize Firebase
const app = initializeApp(firebaseConfig);

// access Firebase Storage using a variable
const projectStorage = getStorage(app);

// access Firestore using a variable
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
