import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const MeetOurAgents = () => {
  const [agents, setAgents] = useState([]);
const axiosInstance = useAxios()
  useEffect(() => {
    axiosInstance.get("/agents") // তুমি চাইলে এখানে `/featured-agents` route ও ব্যবহার করতে পারো
      .then((res) => {
        // প্রথম ৩ জন এজেন্ট দেখাবে
        setAgents(res.data.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-4 my-10">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent._id} className=" shadow-md p-5 rounded-xl border">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{agent.name}</h3>
            <p className="text-gray-600 mb-2">
              <strong>Experience:</strong> {agent.experience} years
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Specialties:</strong> {agent.specialties?.join(", ")}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {agent.email}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> {agent.phone}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <FaStar className="text-yellow-500" />
              <span className="font-medium">{agent.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurAgents;
