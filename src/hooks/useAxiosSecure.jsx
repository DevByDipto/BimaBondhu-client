import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, 
});

const useAxiosSecure = () => {
  const {user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{

    const token = localStorage.getItem('token')
      axiosSecure.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${token}`
        return config
     
    })
console.log("tokenset",token);

  },[user])
  // console.log(token);
  
    // request interceptors
  

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      toast.error( err.message );
      
      const status = err.status;
      if (status == 403) {
        navigate("/forbiden");
      } else if (status == 401) {
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

  return axiosSecure;
};

export default useAxiosSecure;
