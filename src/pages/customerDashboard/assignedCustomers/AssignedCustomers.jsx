import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AssignedCustomers = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState();
  const navigation = useNavigate();
  // 🔍 Get assigned applications
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assigned-applications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/applications"); // 🔁 adjust endpoint if needed
      return res.data;
    },
  });

  // 🔁 Status update mutation

  const mutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      console.log(id);
      
      const res = await axiosInstance.patch(`/applications/status/${id}`, {
        application_status: newStatus,
      });
      
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

  if (isLoading)
    return <p className="text-center py-10">Loading customers...</p>;
  if (isError)
    return <p className="text-center text-red-500">❌ Failed to load data</p>;

  const handleStatusChange = (id, newStatus) => {
    // console.log(newStatus);
    mutation.mutate({ id, newStatus });
    setSelectedStatus(newStatus);
  };

  // const handleUpdateStatus = (id) => {
  //   console.log({newStatus: selectedStatus[id]});

  //   mutation.mutate({ id, newStatus: selectedStatus[id] });
  // };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assigned Customers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="">
            <tr>
              {/* <th>#</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => {
            return  app.agent_status === "approved" &&
            
                
                <tr key={app._id} className="border-b">
                  {/* <td>{index + 1}</td> */}
                  <td>{app.name || "N/A"}</td>
                  <td>{app.email}</td>
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
                      {app.application_status}
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
                      value={app.application_status}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      }
                      className="select select-sm select-bordered"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {/* <button
                    onClick={() => handleUpdateStatus(app._id)}
                    className="btn btn-sm bg-gray-800 text-white hover:bg-gray-900"
                  >
                    Update
                  </button> */}
                  </td>
                </tr>
              
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedCustomers;
