import { useState, useEffect } from "react";
import { app } from "../config/firebase";

function useAuth() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [users, setUsers] = useState(null);
  const [transactions, setTransactions] = useState(null)

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
          
          const users = await db
            .collection("users")
            .get()
            .then(queryResult=>{
              const users = []
              queryResult.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
              });
              console.log(users)
              return users
            });

            const transactions = await db
            .collection("transactions")
            .orderBy('date')
            .get()
            .then(queryResult=>{
              const transactions = []
              queryResult.forEach((doc) => {
                transactions.push({ id: doc.id, ...doc.data() });
              });
              return transactions
            });

            setError(null);
            setData({ isAuth: !!data, ...data });
            setUsers(users)
            setTransactions(transactions)
        } catch (error) {
          setEmail(user.email);
          setError(error);
          setData({ isAuth: !!user });
        }
      } else {
        setData({ isAuth: !!user });
        setError(null);
        setUsers(null);
        setTransactions(null);
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
    users,
    signOut,
    transactions
  };
}

export default useAuth;
