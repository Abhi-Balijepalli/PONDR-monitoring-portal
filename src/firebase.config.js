import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Cookies } from 'react-cookie';

export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  const cookies = new Cookies();
  if (user) {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        cookies.set('authToken', idToken, { path: '/' });
      });
  } else {
    cookies.remove('authToken', { path: '/' });
  }
});

export default firebase;
