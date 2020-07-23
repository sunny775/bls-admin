import { useState, useEffect } from "react";
import { app } from "../config/firebase";

function useGetUser() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  const { auth, db } = app;
  const user = auth.currentUser;

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
  }, [auth]);

  console.log("data:", data);

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
    error,
    signOut,
  };
}

export default useGetUser;
