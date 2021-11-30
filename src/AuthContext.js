import { auth } from "./firebase";
import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  };

  const logout = () => {
    return auth.signOut();
  };

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
