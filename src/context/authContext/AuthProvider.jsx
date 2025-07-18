import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import axios from "axios";
import toast from "react-hot-toast";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading,setLoading] = useState(true)
const provider = new GoogleAuthProvider();

const signinWithGoogle=()=>{
 return signInWithPopup(auth, provider)
}
    
  const createUser = (email, password) => {
    //??????????????????aikhane loading true korar gurotto??
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile=(displayName,photoURL)=>{
   return updateProfile(auth.currentUser, {
  displayName, photoURL,
})
  }

  const logoutUser=()=>{
     signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log({currentUser});
        setUser(currentUser);
         if (user?.email) {
        axios
          .post(`${import.meta.env.VITE_API_BASE_URL}/jwt`, { email: user.email })
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("token", res.data.token);
            }
          })
          .catch(err=>toast.error(err.message))
      }
        setLoading(false)
      return () => {
        unsubscribe();
      };
    });
  });

  const authInfo = {
    createUser,
    signInUser,
    user,
    loading,
    signinWithGoogle,
    logoutUser,
    updateUserProfile
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
