import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default function initFirebase() {
  const firebaseConfig = {};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
