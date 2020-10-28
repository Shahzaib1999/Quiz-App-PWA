importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAHbGicWfGnZltGWb71s5lbL9y194gXwLs",
  authDomain: "project-7a-4fc20.firebaseapp.com",
  databaseURL: "https://project-7a-4fc20.firebaseio.com",
  projectId: "project-7a-4fc20",
  storageBucket: "project-7a-4fc20.appspot.com",
  messagingSenderId: "153542201034",
  appId: "1:153542201034:web:2784a01b8017cddabeae33",
  measurementId: "G-F095BFC50D"
});

const messaging = firebase.messaging();