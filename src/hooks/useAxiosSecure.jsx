import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, 
});

const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem('token')
    // request interceptors
    axiosSecure.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${token}`
        return config
    })

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log({ err });
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
