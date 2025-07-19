import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaHistory,
  FaMapMarkedAlt,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaUserPlus,
} from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6"; // Profile এর জন্য
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoder } = useUserRole();
  // console.log(role);
  
  if (roleLoder) {
    return "......loding";
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        {/* Page content start*/}
        <Outlet></Outlet>
        {/* Page content end */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <li>
            <NavLink to="/">
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="manage-policies">
              <FaHome className="mr-2" /> Manage Policies
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/dashboard/profile">
              <FaRegUser className="mr-2" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="my-policies">
              <FaRegUser className="mr-2" /> My Policies
            </NavLink>
          </li>

          {/* rider role nav items */}
          {/* {role == "agent" && ( */}
            <>
            <NavLink to="manage-applications">
              <FaRegUser className="mr-2" /> Manage Applications
            </NavLink>
            </>
          {/* )} */}
          {/* admin role nav items */}
          {role == "admin" && (
            <>
             
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
