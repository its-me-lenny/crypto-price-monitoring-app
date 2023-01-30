import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setDoc(doc(db, "users", email), { watchList: [] });
        return { success: "You have successfully registered an account." };
      })
      .catch((error) => {
        console.log(error.message);
        return { error: error.message };
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return { success: `Welcome, ${userCredential.user.email}` };
      })
      .catch((error) => {
        console.log(error.message);
        return { error: error.message };
      });
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        return { success: "You have been logged out successfully." };
      })
      .catch((error) => {
        console.log(error.message);
        return { error: error.message };
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ signUp, signIn, logOut, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(UserContext);
};
