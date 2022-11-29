import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };
