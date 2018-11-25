import firebase from 'firebase';

const config = {

};
firebase.initializeApp (config);

export const auth = true;
export const ref = firebase.database ().ref ();
export const dbF = firebase.firestore ();
export const firebaseAuth = firebase.auth;
