import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const fetchApplication = async (id) => {
  const res = await fetch(`https://your-server-url.com/applications/${id}`);
  
  return res.json();
};

const ApplicationDetails = () => {
  const { applicationId } = useParams();
//   console.log(applicationId);
  const axiosSecure = useAxiosSecure()
//   console.log(axiosSecure);
  
  const {
    data: application,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: async () => {
  const res = await axiosSecure.get(`/applications?id=${applicationId}`);
  
  return res.data;
},
  });
  console.log(application);
  

  if (isLoading) return <div className="text-center p-10">লোড হচ্ছে...</div>;
  if (isError)
    return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="max-w-3xl mx-auto shadow-xl rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Application Details</h2>
      <div className="space-y-2 text-lg">
        <p><strong>Name:</strong> {application.name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Address:</strong> {application.address}</p>
        <p><strong>NID:</strong> {application.nid}</p>
        <p><strong>Nominee Name:</strong> {application.nomineeName}</p>
        <p><strong>Nominee Relation:</strong> {application.nomineeRelation}</p>
        <p><strong>Policy Title:</strong> {application.policy_title}</p>
        <p><strong>Status:</strong> <span className="capitalize">{application.status}</span></p>
        <p><strong>Created At:</strong> {new Date(application.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ApplicationDetails;
