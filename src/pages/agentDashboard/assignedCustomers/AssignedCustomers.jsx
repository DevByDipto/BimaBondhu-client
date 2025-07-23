import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DownloadPolicyButton from "./DownloadPolicyButton";
import useAuth from "../../../hooks/useAuth";

const AssignedCustomers = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingAppId, setRejectingAppId] = useState(null);
  const navigation = useNavigate();


  // 🔍 Get assigned applications
  const {
  data: applications = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ["assigned-applications", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/applications/${user.email}`);
    return res.data;
  },
  enabled: !!user?.email, // ✅ শুধু তখনই চালাবে যদি user.email truthy হয়
});

// console.log(applications);

  // 🔁 Status update mutation
  const mutation = useMutation({
    mutationFn: async ({ id, newStatus, reason }) => {
      const payload = {
        application_status: newStatus,
      };
      if (newStatus === "rejected") {
        payload.reject_reason = reason; // 📤 কারণ পাঠানো হচ্ছে
      }

      const res = await axiosSecure.patch(`/applications/status/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Application status updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      queryClient.invalidateQueries(["assigned-applications"]);
      setShowRejectModal(false);
      setRejectReason("");
      setRejectingAppId(null);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.error || "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === "rejected") {
      setRejectingAppId(id);
      setShowRejectModal(true);
    } else {
      mutation.mutate({ id, newStatus });
    }
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      Swal.fire("Required", "Please enter a reason for rejection.", "warning");
      return;
    }
    mutation.mutate({
      id: rejectingAppId,
      newStatus: "rejected",
      reason: rejectReason,
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading customers...</p>;
  if (isError) return <p className="text-center text-red-500">❌ Failed to load data</p>;
console.log(applications);

  return (
    <div className="p-6">
      <title>Assigned Customers</title>
      <h2 className="text-2xl font-bold mb-4">Assigned Customers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) =>
              app.agent_status === "approved" ? (
                <tr key={app._id} className="border-b">
                  {console.log(app)
                  }
                  <td>{app?.name || "N/A"}</td>
                  <td>{app?.email}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        app.application_status === "pending"
                          ? "bg-yellow-500"
                          : app.application_status === "approved"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {app?.application_status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() =>
                        navigation(`/application-details/${app._id}`)
                      }
                    >
                      View Details
                    </button>
                  </td>
                  <td className="flex items-center gap-2">
                    <select
                      value={app?.application_status}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      }
                      className="select select-sm select-bordered"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
  

  {/* ✅ Show download only if approved */}
  {app.application_status === "approved" && (
    <DownloadPolicyButton application={app} />
  )}
</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      {/* 🔻 Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Reject Application</h3>
            <textarea
              placeholder="Write reason for rejection..."
              className="textarea textarea-bordered w-full"
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setRejectingAppId(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-error text-white" onClick={handleRejectSubmit}>
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedCustomers;
