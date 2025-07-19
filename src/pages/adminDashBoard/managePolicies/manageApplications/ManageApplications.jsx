import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

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
            <th>Action</th>
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
                <button className="btn btn-sm btn-outline btn-info flex items-center gap-1">
                  <FaEye /> View
                </button>
              </td>
              <td>
                <button className="btn btn-sm btn-outline btn-warning">
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageApplications;
