import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config'

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // create user
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // sign in user
  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  //update user profile
  const updateUserProfile = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
  }

  //logout user
  const signOutUser = () => {
    setLoading(true)
    return signOut(auth);
  }

  //observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      console.log(currentUser)
      setLoading(false)
    })
    return () => {
      return unsubscribe();
    }
  }, [])

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    updateUserProfile,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
