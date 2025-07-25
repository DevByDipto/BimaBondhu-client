import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ClaimRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const {user} = useAuth()
  const [reason, setReason] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch approved policies
  const { data: approvedPolicies = [], refetch } = useQuery({
    queryKey: ["approvedApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application-details");
      return res.data.filter((app) => app.application_status === "approved");
    },
  });

    // console.log(approvedPolicies);

  // ✅ Upload image to imgbb
  const handleImageUpload = async (e) => {
    setUploading(true);
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

    try {
      const res = await axios.post(url, formData);
      setImageUrl(res.data.data.url);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit Claim
  const handleSubmit = async (e) => {
    e.preventDefault();

    const claimData = {
      policy_id: selectedPolicy.policyDetails._id,   
      policy_name: selectedPolicy.policyDetails.title,
      policy_amount: selectedPolicy.policyDetails.coverage_amount,
      user_email: selectedPolicy.email,
      agent_email: selectedPolicy.agent_email,
      reason,
      document: imageUrl,
      claim_status: "pending",
    };
// console.log(claimData);

    try {
      await axiosSecure.post("/claims", claimData);
    //   console.log(claimData);

      Swal.fire("Success", "Claim submitted successfully", "success");
      setSelectedPolicy(null);
      setReason("");
      setImageUrl("");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit claim", "error");
    }
  };
// console.log("user",user?.email);

  return (
    <div className="p-5">
      <title>Claim Request</title>
      <h2 className="text-xl font-bold mb-4">Approved Policies for Claim</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Policy Name</th>
              <th>Category</th>
              <th>Premium</th>
              <th>Claim Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedPolicies.map((policy, index) => {
if(policy?.email === user?.email){


            
             return <tr key={policy._id}>
                {/* {console.log("polocy",policy?.email)} */}
                <td>{index + 1}</td>
                <td>{policy.policyDetails?.title}</td>
                <td>{policy.policyDetails?.category}</td>
                <td>${policy.policyDetails?.premium_per_month}</td>

                {/* ✅ Claim Status Column */}
                <td className="font-semibold">
                  {policy.claim_status ? (
                    <span
                      className={
                        policy.claim_status === "pending"
                          ? "text-yellow-500"
                          : policy.claim_status === "approved"
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      {policy.claim_status.toUpperCase()}
                    </span>
                  ) : (
                    <span className="text-gray-400">NONE</span>
                  )}
                </td>

                {/* ✅ Claim Button (disabled if claim_status exists) */}
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedPolicy(policy)}
                    disabled={
                      policy.claim_status === "pending" ||
                      policy.claim_status === "approved"
                    }
                  >
                    Claim
                  </button>
                </td>
              </tr>}
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
          <div className="bg-gray-700 p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Submit Claim</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Policy Name</label>
                <input
                  type="text"
                  value={selectedPolicy.policyDetails.title}
                  readOnly
                  className="input input-bordered w-full "
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Reason for Claim
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Upload Document
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageUpload}
                  required
                />
              </div>
              {uploading && <p className="text-blue-500">Uploading...</p>}

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={uploading || !imageUrl}
                >
                  Submit Claim
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedPolicy(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimRequest;
