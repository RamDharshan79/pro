// Import Firebase modules using CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Your Firebase config (paste YOUR config here)
const firebaseConfig = {
  apiKey: "AIzaSyDnBZTsgnlAGwG_3kx4nLhswukA8IeVgJM",
  authDomain: "test-3e2eb.firebaseapp.com",
  projectId: "test-3e2eb",
  storageBucket: "test-3e2eb.firebasestorage.app",
  messagingSenderId: "506591336976",
  appId: "1:506591336976:web:0057fc1be25cb1ed734895",
  measurementId: "G-E4MZ2JMJNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Function to load courses
export async function loadCourses(domainFilter = null) {
  let q = collection(db, "courses");

  if (domainFilter) {
    q = query(q, where("domain", "==", domainFilter));
  }

  const snapshot = await getDocs(q);
  const courses = [];
  snapshot.forEach((doc) => {
    courses.push({ id: doc.id, ...doc.data() });
  });

  return courses;
}

