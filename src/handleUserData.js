import { firestore } from "./firebase";

const handleUserData = (method, userId, userData) => {
  switch (method) {
    case "add":
      return firestore.collection("users").doc(userId).set(userData);
    case "update":
      return firestore.collection("users").doc(userId).update(userData);
    case "delete":
      return firestore.collection("users").doc(userId).delete();
    case "get":
      return firestore.collection("users").doc(userId).get();
    default:
      return;
  }
};

export default handleUserData;
