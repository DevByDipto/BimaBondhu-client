// ✅ Extra imports
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const modalRef = useRef();
  const rejectModalRef = useRef(); // 🆕 reject reason modal
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectReason, setRejectReason] = useState(""); // 🆕 reason state
  const queryClient = useQueryClient();

  // ✅ Load Applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // ✅ Load Agents
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  // ✅ Assign Mutation
  const assignMutation = useMutation({
    mutationFn: async ({ applicationId, agentId }) => {
      await axiosSecure.patch(`/assign-agent`, { applicationId, agentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      modalRef.current.close();
      Swal.fire({
        icon: "success",
        title: "Agent assigned successfully!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });
    },
  });

  // ✅ Reject Mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ applicationId, reason }) => {
      await axiosSecure.patch(`/applications/reject/${applicationId}`, { reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      rejectModalRef.current.close();
      Swal.fire({
        icon: "success",
        title: "Application rejected",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });
    },
  });

  const openAssignModal = (application) => {
    setSelectedApplication(application);
    modalRef.current.showModal();
  };

  const openRejectModal = (application) => {
    setSelectedApplication(application);
    setRejectReason("");
    rejectModalRef.current.showModal();
  };

  const handleRejectSubmit = () => {
    if (!rejectReason) return Swal.fire("Please provide a reason!");

    rejectMutation.mutate({
      applicationId: selectedApplication._id,
      reason: rejectReason,
    });
  };

  if (isLoading) return <p className="text-center py-10">লোড হচ্ছে...</p>;

  return (
    <div className="p-5 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Applications</h2>

      <table className="table w-full border">
        <thead className="bg-base-200 text-base font-medium">
          <tr>
            <th>#</th>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Policy Name</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>View</th>
            <th>Assign</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id}>
              <td>{index + 1}</td>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.policy_title}</td>
              <td>{new Date(app.created_at).toLocaleDateString()}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    app.agent_status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.agent_status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.agent_status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => navigate(`/application-details/${app._id}`)}
                >
                  <FaEye /> View
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-warning"
                  onClick={() => openAssignModal(app)}
                  disabled={app.agent_status !== "pending"}
                >
                  Assign Agent
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => openRejectModal(app)}
                  disabled={app.agent_status !== "pending"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Assign Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">
            Assign Agent to {selectedApplication?.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="border p-3 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold">{agent.name}</h4>
                  <p className="text-sm">Experience: {agent.experience} yrs</p>
                  <p className="text-sm">
                    Specialties: {agent.specialties?.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => assignMutation.mutate({ applicationId: selectedApplication._id, agentId: agent._id })}
                  className="btn btn-sm btn-primary"
                >
                  Assign
                </button>
              </div>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* ✅ Reject Modal */}
      <dialog ref={rejectModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Provide a reason for rejecting {selectedApplication?.name}'s application
          </h3>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Write rejection reason here..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral mr-2">Cancel</button>
            </form>
            <button onClick={handleRejectSubmit} className="btn btn-error">
              Submit Reject
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageApplications;
