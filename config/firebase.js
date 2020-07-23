import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";
import Router from "next/router";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  if (typeof window !== "undefined") {
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(process.env.FIREBASE_PUBLIC_VAPID_KEY);
    return {
      db: firebase.firestore(),
      auth: firebase.auth(),
      storageRef: firebase.storage().ref(),
      messaging,
    };
  }

  return {
    db: firebase.firestore(),
    auth: firebase.auth(),
    storageRef: firebase.storage().ref(),
  };
};
export const app = initFirebase();

const { db } = app;

export const uiConfig = () => ({
  signInFlow: "popup",

  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
     /* const { isNewUser } = authResult.additionalUserInfo;
      const { email, uid } = authResult.user;
      if (isNewUser) {
        db.collection("admins")
          .doc(uid)
          .set({
            uid,
            email,
            role: 1,
            deviceToken,
          })
          .then((docRef) => {
            Router.push("/dashboard");
          })
          .catch(function (error) {
            console.log("error creating user document:", error);
          });
      } else {*/
       //Router.push("/dashboard");
      //}
      return false;
    },
  },
});




//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\user\Desktop\BetterLifeSavings\Next\bls-admin\serviceAccount.json"

//bash:  FIREBASE_CONFIG=C:\Users\user\Desktop\BetterLifeSavings\Next\bls-admin\firebase_config.json

// $env:GOOGLE_APPLICATION_CREDENTIALS=".\serviceAccount.json"

