import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import SocalLogin from "../socalLogin/SocalLogin";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const Login = () => {
  const axiosInstance = useAxios()
  const navigate = useNavigate()
const location = useLocation()
const [loding,setLoading] = useState(false)
// console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const onSubmit = (data) => {
setLoading(true)
    signInUser(data.email, data.password)
      .then(async (result) => {
        // console.log(result.user);
        const lastLoginTime = new Date(
          result.user.metadata.lastSignInTime
        )
        const email = result.user.email;
        const userRes = await axiosInstance.patch(
          `/user/update-last-login?email=${email}`,
          {lastLoginTime}
        );
        // console.log("userinfo", userRes.data);
        navigate(location.state || '/')
        setLoading(false)

      })
      .catch((err) => {toast.error(err.message)
        setLoading(false)
      });
  };

  return (
    <section className="flex items-center justify-center ">
      <title>Login</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">login account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
                // defaultValue='123456Aa'
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">pass must required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">6 desiget must required</p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
{loding && <p className="text-blue-500">loading....</p>}
              <button disabled={loding} className="btn btn-primary text-black mt-4">Login</button>
              <SocalLogin></SocalLogin>
              <p>
                <small>
                  first time in web!.
                  <NavLink to="/register" state={location.state} className="btn-link text-primary">
                    Register
                  </NavLink>
                </small>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
