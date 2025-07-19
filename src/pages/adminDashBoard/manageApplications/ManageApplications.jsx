import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const modalRef = useRef();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const queryClient = useQueryClient();

  // 🔶 Applications Load
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // 🔷 Agents Load
  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agents");
      return res.data;
    },
  });

  // 🔄 Assign Mutation
  const assignMutation = useMutation({
    mutationFn: async ({ applicationId, agentId }) => {
      await axiosSecure.patch(`/assign-agent`, { applicationId, agentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      modalRef.current.close();
      Swal.fire({
        icon: "success",
        title: "Agent assigned successfully!",
        showConfirmButton: false,
        timer: 1500,
        position: "top-end",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to assign the agent.",
      });
    },
  });

  // 🔴 Reject Mutation
  const rejectMutation = useMutation({
    mutationFn: async (applicationId) => {
      await axiosSecure.patch(`/applications/reject/${applicationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      Swal.fire({
        icon: "success",
        title: "Application rejected",
        showConfirmButton: false,
        timer: 1500,
        position: "top-end",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to reject the application.",
      });
    },
  });

  const handleAssign = (agentId) => {
    const applicationId = selectedApplication._id;
    assignMutation.mutate({ agentId, applicationId });
  };

  const handleReject = (applicationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(applicationId);
      }
    });
  };

  const openAssignModal = (application) => {
    setSelectedApplication(application);
    modalRef.current.showModal();
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
            <tr key={app._id} className="hover">
              <td>{index + 1}</td>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.policy_title}</td>
              <td>{new Date(app.created_at).toLocaleDateString()}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    app.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                  onClick={() => navigate(`/application-details/${app._id}`)}
                >
                  <FaEye /> View
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-warning"
                  onClick={() => openAssignModal(app)}
                  disabled={app.status !== "Pending"} // ✅ Optional
                >
                  Assign Agent
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleReject(app._id)}
                  disabled={app.status !== "Pending"} // ✅ Optional
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Assign Agent Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">
            Assign Agent for {selectedApplication?.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="border rounded p-3 shadow bg-base-100 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold">{agent.name}</h4>
                  <p className="text-sm">Experience: {agent.experience} yrs</p>
                  <p className="text-sm">
                    Specialties: {agent.specialties?.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => handleAssign(agent._id)}
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
    </div>
  );
};

export default ManageApplications;
