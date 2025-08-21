import React from 'react'
import { FaShieldAlt, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";

const Features = () => {
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
     <div className="pb-12 md:pb-32 max-w-7xl mx-auto px-4">
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
  )
}

export default Features