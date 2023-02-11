// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore } = require("firebase/firestore/lite");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-O8KJN8RsBuz4jfnZiYnFSLPoifqHO8I",
  authDomain: "betterus-999.app.com",
  projectId: "betterus-999",
  storageBucket: "betterus-999.appspot.com",
  messagingSenderId: "462940666876",
  appId: "1:462940666876:web:9b5bc0a470b97cc9c25079",
  measurementId: "G-VD71N7ZWED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

exports.app = app;
exports.db = db;