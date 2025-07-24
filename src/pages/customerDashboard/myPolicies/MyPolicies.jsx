import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

const MyPolicies = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const { data: myPolicies = [], isLoading } = useQuery({
    queryKey: ["myPolicies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-applications/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
// console.log(myPolicies);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const review = {
      policyId: selectedPolicy._id,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      rating,
      message,
      createdAt: new Date(),
    };
    try {
      await axiosSecure.post("/reviews", review);
      Swal.fire("Review Submitted!", "Thanks for your feedback.", "success");
      setSelectedPolicy(null);
      setRating(0);
      setMessage("");
    } catch (error) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      <title>My Policies</title>
      <h2 className="text-2xl font-semibold mb-6">My Policies</h2>

      <div className="overflow-x-auto  rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Policy Title</th>
              <th>Coverage</th>
              <th>Duration</th>
              <th>Premium</th>
              <th>Status</th>
              <th>Give Review</th>
            </tr>
          </thead>
          <tbody>
            {myPolicies.map((item, index) => 
             
              <tr key={item._id}>
                 {console.log(item)
              }
               {/* { console.log(item)
               }
               { console.log(item.policy_title)
               } */}
                
                <td>{index + 1}</td>
                <td>{item.policy_title}</td>
                <td>{item.coverage}</td>
                <td>{item.duration}</td>
                <td>{item.premium_per_month}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      item.application_status === "Approved"
                        ? "bg-green-500"
                        : item.application_status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.application_status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedPolicy(item)}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    Give Review
                  </button>
                </td>
              </tr>

            )}
          </tbody>
        </table>

        {myPolicies.length === 0 && (
          <p className="text-center py-6">No policies found for your account.</p>
        )}
      </div>

      {/* Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0  bg-opacity-40 z-50 flex justify-center items-center">
          <div className=" p-6 rounded-xl bg-gray-300 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              Submit Review for: {selectedPolicy.policy_title}
            </h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">Star Rating</label>
                <Rating
                  initialRating={rating}
                  onChange={(value) => setRating(value)}
                  emptySymbol={<FaRegStar className="text-yellow-400 text-2xl" />}
                  fullSymbol={<FaStar className="text-yellow-500 text-2xl" />}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Your Feedback</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedPolicy(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPolicies;
