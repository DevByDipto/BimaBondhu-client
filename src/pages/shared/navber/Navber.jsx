// src/components/Navbar.jsx

import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout =  () => {
        //  console.log(localStorage.getItem("1st",'token'));
localStorage.removeItem("token")
     logoutUser().then(()=>localStorage.removeItem("token"))
     
    //  console.log(localStorage.getItem("2nd",'token'));
     
    navigate("/");
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/allpolicies"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
        }
      >
        All Policies
      </NavLink>
       <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
        }
      >
        Blog
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : "hover:text-blue-500"
        }
      >
        About
      </NavLink>
     
      {/* {user && (
       
      )} */}
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Bima<span className="text-gray-800">Bondhu</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 text-lg">
          {navItems}
          {user ? (
            <>
            <img src={user.photoURL} alt=""  className="w-10 rounded-full"/>
              <span className="font-medium text-sm">{user.displayName || "Profile"}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login 
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-4 text-gray-700 text-base">
          {navItems}
          {user ? (
            <>
              <span>{user.displayName || "Profile"}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
