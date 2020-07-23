import { useState, useEffect } from "react";
import { app } from "../config/firebase";
import { successNotice } from "../utils/alerts/userUpdate.success";
import notificationService from "../services/notifications";

function useTransactions() {
  const [userTransactions, setUserTransactions] = useState({});
  const [depositOpen, setDepositOpen] = useState(false);
  const [transLoading, setTransLoading] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false)

  const { auth, db, messaging } = app;
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const { uid } = user;
      const unsubscribe = db
        .collection("transactions")
        .where("owner", "==", `${uid}`)
        .onSnapshot(function (querySnapshot) {
          var transactions = [];
          querySnapshot.forEach(function (doc) {
            transactions.push({ id: doc.id, ...doc.data() });
          });
          setUserTransactions(transactions);
        });

      return () => unsubscribe();
    }
  }, [db, user]);

  const hideDeposit = () => setDepositOpen(false);
  const openDeposit = () => setDepositOpen(true);
  const hideWithdrawal = () => setWithdrawalOpen(false);
  const openWithdrawal = () => setWithdrawalOpen(true);

  const postTransaction = async ({ details, owner, adminDevices, deviceToken }) => {
    if (user) {
      setTransLoading(true);
      db.collection("transactions")
        .add({
          ...details,
          owner: owner.uid,
          date: new Date().toISOString(),
          ownerDetails: {
            name: owner.displayName,
            address: owner.address1,
            city: owner.city,
            state: owner.state,
          },
        })
        .then(function (docRef) {
          setTransLoading(false);
          hideDeposit();
          hideWithdrawal();
          successNotice(`Your ${details.type} request has been sent. Our agents will contact you on further steps`);
          if (details.type === "deposit") {
            notificationService.notifyUserOnDepositRequest({
              owner,
              adminDevices,
              deviceToken
            });
          } else {
            notificationService.notifyUserOnWithdrawalRequest({
              owner,
              adminDevices,
              deviceToken
            });
          }
        })
        .catch(function (error) {
          console.error("Error adding transaction: ", error);
        });
    }
  };

  return {
    userTransactions,
    postTransaction,
    depositOpen,
    hideDeposit,
    openDeposit,
    transLoading,
    withdrawalOpen,
    hideWithdrawal,
    openWithdrawal
  };
}

export default useTransactions;
