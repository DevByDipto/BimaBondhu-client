import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RejectedApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["rejected-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // Filter rejected applications
  const rejectedApplications = applications.filter(
    (app) =>
      app.application_status === "rejected" || app.agent_status === "rejected"
  );

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <title>Rejected Applications</title>

      <h2 className="text-xl font-bold mb-4">❌ Rejected Applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rejection Type</th>
              <th>Rejection Reason</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rejectedApplications.map((app, index) => {
              const isAgentRejected = app.agent_status === "rejected";
              const isApplicationRejected =
                app.application_status === "rejected";
              const rejectionReason = !isAgentRejected
                ? app.agent_rejection_reason || "Not specified"
                : app.amdin_rejection_reason || "Not specified";
              // console.log(index+1,isAgentRejected,rejectionReason,"----",app.amdin_rejection_reason,{app});

              const rejectionType = isAgentRejected
                ? "Agent Application"
                : "Policy Application";

              const statusLabel = isAgentRejected
                ? "Agent Rejected"
                : "Application Rejected";

              const formattedDate = new Date(
                app?.created_at
              ).toLocaleDateString("en-GB");

              return (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{rejectionType}</td>
                  <td className="max-w-xs whitespace-pre-wrap">
                    {rejectionReason}
                  </td>
                  <td>{formattedDate}</td>
                  <td className="text-red-500 font-semibold">{statusLabel}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RejectedApplications;
