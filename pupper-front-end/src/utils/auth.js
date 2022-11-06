import firebase from 'firebase/app';
import 'firebase/auth';
import UserApi from '../api/userApi';

const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const firebaseUser = await firebase.auth().signInWithPopup(provider);
  UserApi.ValidateUser(firebaseUser.user.uid, firebaseUser.user.Aa);
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };
