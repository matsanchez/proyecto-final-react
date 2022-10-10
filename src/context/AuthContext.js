import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/Init";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No hay provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const favorites = JSON.parse(localStorage.getItem("userFavorites") || "[]");
  const [userFavorites, setUserFavorites] = useState(favorites);
  const [user, setUser] = useState();

  const setRegister = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const setLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  const setLogOut = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  useEffect(() => {
    localStorage.setItem("userFavorites", JSON.stringify(userFavorites));
  }, [userFavorites]);

  const addFavorites = (item) => {
    if (!tempFavorites(item.id)) {
      setUserFavorites([...userFavorites, { ...item }]);
    } else {
      return false;
    }
  };

  const tempFavorites = (id) => {
    return userFavorites.some((_item) => _item.id === id);
  };

  const removeFavorite = (id) => {
    setUserFavorites(userFavorites.filter((_item) => _item.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        setRegister,
        setLogin,
        resetPassword,
        setLogOut,
        user,
        addFavorites,
        userFavorites,
        tempFavorites,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
