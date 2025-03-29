"use client"
import { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { createUserDocument } from '@/actions/user';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signup(email, password) {
    const user = createUserWithEmailAndPassword(auth, email, password);
    await createUserDocument(user, { displayName });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  return {
    currentUser,
    loading,
    signup,
    login,
    logout
  };
}