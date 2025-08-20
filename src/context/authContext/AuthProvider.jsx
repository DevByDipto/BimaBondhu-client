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
import { axiosSecure } from "../../hooks/useAxiosSecure";
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
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log({currentUser});
        setUser(currentUser);
         if (currentUser?.email) {
        axios
          .post(`${import.meta.env.VITE_API_BASE_URL}/jwt`, { email: currentUser.email })
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("token", res.data.token);
              // axiosSecure.defaults.headers.common['Authorization']=`Bearer ${res.data.token}`
                setLoading(false)
            }
          })
          .catch(err=>toast.error(err.message))
      }else{
        setLoading(false)
      }
    
    });
  
      return () => {
        unsubscribe();
      };
  },[]);

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
