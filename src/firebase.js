import firebase from 'firebase/app';
import 'firebase/messaging';
const config = {
    apiKey: "AIzaSyAmvUNRt3HQRlZXKA0eo0LU5ZqQl3_t64o",
    authDomain: "fcm-cadb5.firebaseapp.com",
    databaseURL: "https://fcm-cadb5.firebaseio.com",
    projectId: "fcm-cadb5",
    storageBucket: "fcm-cadb5.appspot.com",
    messagingSenderId: "762403478632",
    appId: "1:762403478632:web:6eb97320d64350a9956fdd",
    measurementId: "G-8RV7EWWKW3"
}

firebase.initializeApp(config);

export default firebase