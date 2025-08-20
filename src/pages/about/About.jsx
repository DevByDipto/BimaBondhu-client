import React from "react";
import { FaShieldAlt, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";

const About = () => {

  const features = [
    {
      icon: <FaShieldAlt className="text-4xl mx-auto text-blue-600 mb-3" />,
      title: "Comprehensive Coverage",
      description: "Get peace of mind with policies covering life, health, and more.",
    },
    {
      icon: <FaFileInvoiceDollar className="text-4xl mx-auto text-blue-600 mb-3" />,
      title: "Affordable Plans",
      description: "Flexible and cost-effective insurance plans to suit your needs.",
    },
    {
      icon: <FaUsers className="text-4xl mx-auto text-blue-600 mb-3" />,
      title: "Trusted Advisors",
      description: "Our agents provide expert guidance and personalized support.",
    },
  ];

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
      <div className="pb-12 md:pb-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Our <span className="">Features</span>
        </h2> 
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 border border-blue-400 rounded-xl shadow hover:shadow-lg transition"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default About;
