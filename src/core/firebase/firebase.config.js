import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default function initFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBCZ9RK2tV3ZTxJlDvkmV-nPJQUwZ3WzcM',
    authDomain: 'combate-incendios-dev.firebaseapp.com',
    projectId: 'combate-incendios-dev',
    storageBucket: 'combate-incendios-dev.appspot.com',
    messagingSenderId: '883770424001',
    appId: '1:883770424001:web:72bf5cfadf0b7708c63240',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
