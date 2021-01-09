import * as firebase from "firebase";
require("@firebase/firestore");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDMfQURQwtpPxVXCWoS9ym_4rUs6FkZnFc",
    authDomain: "bartersystem-2c4a4.firebaseapp.com",
    databaseURL: "https://bartersystem-2c4a4.firebaseio.com",
    projectId: "bartersystem-2c4a4",
    storageBucket: "bartersystem-2c4a4.appspot.com",
    messagingSenderId: "266086027296",
    appId: "1:266086027296:web:4f1596a18cd6434da96c45"
  };
  // Initialize Firebase

 firebase.initializeApp(firebaseConfig);
 export default firebase.firestore();
