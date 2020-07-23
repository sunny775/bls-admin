import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { app } from "../config/firebase";
//import { successNotice } from "../utils/alerts/userUpdate.success";
// import notificationService from "../services/notifications";

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    const user = app.auth.currentUser;
    if (user) {
      app.db
        .collection("adminDevices")
        .doc(user.uid)
        .set(
          {
            deviceToken: currentToken,
          },
          { merge: true }
        )
        .then(function () {
          setTokenSentToServer(true);
          console.log("Token sent to server");
        })
        .catch(function (error) {
          console.error("Error sending token: ", error);
        });
    }
  }
}
function isTokenSentToServer() {
  return window.localStorage.getItem("sentToServer") === "1";
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

function useGetUser() {
  const [data, setData] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [admins, setAdmins] = useState([]);

  const { auth, db, storageRef, messaging } = app;
  const user = auth.currentUser;

  useEffect(() => {
    messaging
      .getToken()
      .then((currentToken) => {
        if (currentToken) {
          setDeviceToken(currentToken);
          console.log(currentToken);
        } else {
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
          setTokenSentToServer(false);
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        setTokenSentToServer(false);
      });
    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then((refreshedToken) => {
          console.log("Token refreshed.");
          setTokenSentToServer(false);
          setDeviceToken(refreshedToken);
        })
        .catch((err) => {
          console.log("Unable to retrieve refreshed token ", err);
        });
    });
    messaging.onMessage((payload) =>
      console.log("Message received. ", payload)
    );
  });

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        try {
          const { uid } = user;
          const data = await db
            .collection("admins")
            .doc(uid)
            .get()
            .then((doc) => doc.data());
          setError(null);
          setData({ isAuth: !!data, ...data });
          if (data) sendTokenToServer(deviceToken);
          //sendTokenToServer(deviceToken);
        } catch (error) {
          setEmail(user.email);
          setError(error);
          setData({ isAuth: !!user });
        }
      } else {
        setData({ isAuth: !!user });
        setError(null);
      }
    });
    return unregisterAuthObserver;
  }, [auth, deviceToken]);
  const tokenName = "idToken";

  console.log("data:", data);

  /*useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("role", "==", 1)
      .onSnapshot(function (querySnapshot) {
        const admins = [];
        const adminDevices = [];
        querySnapshot.forEach(function (doc) {
          admins.push({ id: doc.id, ...doc.data() });
          adminDevices.push(doc.data().deviceToken);
        });
        setAdmins(admins);
        setAdminDevices(adminDevices);
      });

    return () => unsubscribe();
  }, [db]);*/

  const signOut = () =>
    auth
      .signOut()
      .then(function () {
        console.log("sign out successful");
      })
      .catch(function (error) {
        console.log("error");
      });

  return {
    data,
    email,
    deviceToken,
    admins,
    error,
    signOut,
  };
}

export default useGetUser;

/*
const find = () => {
    setLoading(true);
    userService
      .getUser()
      .then((user) => {
        setData(user);
        setLoading(false);
      })
      .catch((error) => {
        setData(error);
        setLoading(false);
      });
  };

  const save = (value) => {
    setLoading(true);
    userService
      .createUser(value)
      .then((user) => {
        console.log("postresutl:", user);
        setData({ isAuth: true, ...user });
        setLoading(false);
      })
      .catch((err) => {
        console.log("postresutl:", err);
        setData({ isAuth: false, ...err });
        setLoading(false);
      });
  };
  const login = async (options) => {
    setLoading(true);
    const user = await userService.login(options);
    setData(user);
    setLoading(false);
  };
*/
