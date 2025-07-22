import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const PopularPolicies = () => {
  const axiosInstance = useAxios();
const navigate = useNavigate()
  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axiosInstance.get("/policies/popular");
      return res.data.data;
    },
  });

  if (isLoading) return <p className="text-center text-lg py-10">লোড হচ্ছে...</p>;

  return (
    <section className="mt-20 md:mt-32">
       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Popular Policies</h2>
    
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {policies?.map((policy) => (
        <div
          key={policy._id}
          className="bg-base-100 border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300"
          onClick={()=>navigate(`policies-details/${policy._id}`)}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">{policy.title}</h2>
            <span className="text-red-500 flex items-center gap-1 text-sm">
              <FaFire /> {policy.purchased || 0}
            </span>
          </div>

          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Coverage:</span> ৳{policy.coverage_amount}
            </p>
            <p>
              <span className="font-medium">Term Duration:</span> {policy.term_length_years} years
            </p>
            <p>
              <span className="font-medium">Popularity:</span> {policy.purchased || 0} times
            </p>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default PopularPolicies;
