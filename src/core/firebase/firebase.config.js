import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebase_conf_desv } from '../../env/desv';

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebase_conf_desv);
  }
}
