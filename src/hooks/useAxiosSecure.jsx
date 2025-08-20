import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { configs } from "eslint-plugin-react-refresh";

export const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, 
});

const useAxiosSecure = () => {
  const {user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{

    
    axiosSecure.interceptors.request.use(config=>{
       if(user){
         const token = localStorage.getItem('token')
         console.log(token);
         
        // if(token){
          config.headers.authorization = `Bearer ${token}`
          return config

        // }
       }
     
    },error=>{return Promise.reject(error)})

     axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      // toast.error( err.message );
      // console.log(err.message );
      
      const status = err.status;
      // if (status == 403) {
      //   navigate("/forbiden");
      // } else
        
        if (status == 401) {
        logoutUser()
          .then(() => {
            localStorage.removeItem("token");
            navigate("/login");
          })
          .catch(() => {});
      }
      return Promise.reject(err);
    }
  );
  },[user,logoutUser,navigate])
  // console.log(token);
  
    // request interceptors
  

 

  return axiosSecure;
};

export default useAxiosSecure;
