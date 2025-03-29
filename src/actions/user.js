
import { db } from "./firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

export const createUserDocument = async (user, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || additionalData.displayName || "",
    photoURL: user.photoURL || additionalData.photoURL || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...additionalData
  }, { merge: true });

  return userRef;
};

export const getUserDocument = async (userId) => {
    if (!userId) return null;
  
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() };
      } else {
        console.log("No such user document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting user document:", error);
      return null;
    }
  };


  import { updateDoc } from "firebase/firestore";

export const updateUserDocument = async (userId, data) => {
  if (!userId) return;

  const userRef = doc(db, "users", userId);
  
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};