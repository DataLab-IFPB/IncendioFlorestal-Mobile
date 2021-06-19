import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default function initFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyADFSCI_b-sl63gEy_9Wok_SKFm2whwrqY',
    authDomain: 'bombeiros-87716.firebaseapp.com',
    databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: 'bombeiros-87716',
    storageBucket: 'bombeiros-87716.appspot.com',
    messagingSenderId: '12345-insert-yourse',
    appId: '1:273734224174:android:3ce91bae63b1304a5992bf',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
