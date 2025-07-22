import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/application-details?id=${applicationId}`
      );
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
// console.log(application);

  const {
    name,
    email,
    nid,
    address,
    nomineeName,
    nomineeRelation,
    health,
    agent_status,
    application_status,
    policyDetails = {},
  } = application || {};

  return (
    <section>

   <title>Application Details</title>
    <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-lg mt-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>NID:</strong> {nid}
        </div>
        <div>
          <strong>Address:</strong> {address}
        </div>

        <div>
          <strong>Application Status:</strong>{" "}
          <span className="capitalize">{application_status}</span>
        </div>

        <div>
          <strong>Agent Status :</strong>{" "}
          <span className="capitalize">{agent_status}</span>
        </div>
        
        <div>
          <strong>Nominee Name:</strong> {nomineeName}
        </div>
        <div>
          <strong>Nominee Relation:</strong> {nomineeRelation}
        </div>
        <div>
          <strong>Health Info:</strong>{" "}
          {health?.length ? health.join(", ") : "N/A"}
        </div>
      </div>

      <hr className="my-6 border-t border-gray-300" />

      <h3 className="text-xl font-semibold text-gray-700">
        Policy Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <strong>Title:</strong> {policyDetails.title}
        </div>
        <div>
          <strong>Category:</strong> {policyDetails.category}
        </div>
        <div>
          <strong>Coverage Amount:</strong> ${policyDetails.coverage_amount}
        </div>
        <div>
          <strong>Monthly Premium:</strong> ${policyDetails.premium_per_month}
        </div>
        <div>
          <strong>Eligibility Age:</strong> {policyDetails.eligibility_age}
        </div>
        <div>
          <strong>Term Length:</strong> {policyDetails.term_length_years} years
        </div>
        <div>
          <strong>Purchased:</strong> {policyDetails.purchased} times
        </div>
      </div>

      <div>
        <strong>Short Description:</strong>
        <p className="text-gray-600">{policyDetails.short_description}</p>
      </div>

      <div>
        <strong>Full Description:</strong>
        <p className="text-gray-600">{policyDetails.full_description}</p>
      </div>

      <div>
        <strong>Benefits:</strong>
        <ul className="list-disc pl-6 text-gray-600">
          {policyDetails.benefits?.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {policyDetails.image && (
        <div>
          <strong>Policy Image:</strong>
          <img
            src={policyDetails.image}
            alt="Policy"
            className="mt-2 w-full max-w-md rounded"
          />
        </div>
      )}
    </div>
     </section>
  );
};

export default ApplicationDetails;
