import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

import Keys from "./Keys";

var firebaseConfig = {
  apiKey: Keys.apiKey,
  authDomain: `${Keys.projectId}.firebaseapp.com`,
  databaseURL: `https://${Keys.projectId}.firebaseio.com`,
  projectId: Keys.projectId,
  storageBucket: `${Keys.projectId}.appspot.com`,
  messagingSenderId: Keys.senderId,
  appId: Keys.appId,
};
// Initialize Fireb ase
firebase.initializeApp(firebaseConfig);
