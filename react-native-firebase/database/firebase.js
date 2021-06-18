import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBhhGFSkJb-TXheRMBH-1DxRJQ-vJgpNZw",
    authDomain: "react-native-firebase-e542f.firebaseapp.com",
    projectId: "react-native-firebase-e542f",
    storageBucket: "react-native-firebase-e542f.appspot.com",
    messagingSenderId: "620100031110",
    appId: "1:620100031110:web:c16374e1b41da1f79d3707"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default {
      firebase,
      db,
  };