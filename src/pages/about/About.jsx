import React from "react";
import { FaShieldAlt, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";

const About = () => {

  

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 md:pt-32">
      
      <h1 className="text-4xl font-bold text-center mb-10">
        About <span className="">BimaBondhu</span>
      </h1> 

      <div className="pb-12 md:pb-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Description */}
        <div>
          <p className="text-lg  mb-4 leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">BimaBondhu</span>, your trusted partner for life and health insurance solutions. Whether you are looking for personal coverage or family protection, we have policies designed for every need.
          </p>
          <p className="text-lg  mb-4">
            We connect you with experienced advisors, provide flexible plans, and ensure smooth claim processes. Secure your future today with <span className="font-semibold text-blue-600">BimaBondhu</span>.
          </p>
        </div>

        {/* Right: Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1598514982873-9db2d7b486c4"
            alt="About BimaBondhu"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Features */}
     
      
    </div>
  );
};

export default About;
