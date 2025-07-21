import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';

const PolicyClearance = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ['all-policies-for-clearance'],
    queryFn: async () => {
      const res = await axiosSecure.get('/policiesClearance');
      return res.data;
    },
  });

  

  const handleViewDetails = (policy) => {
    setSelectedPolicy(policy);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
            <title>Policy Clearance</title>

      <h2 className="text-2xl font-semibold mb-4">Policy Clearance</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Policy Name</th>
              <th>Amount</th>
              <th>View</th>
              
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={policy._id}>
                <td>{index + 1}</td>
                <td>{policy.policy_name}</td>
                <td>${policy.policy_amount}</td>
                <td>
                  <button
                    onClick={() => handleViewDetails(policy)}
                    className="btn btn-info btn-sm"
                  >
                    View Details
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal with all details */}
      {selectedPolicy && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-2">Policy Details</h3>
            <img
              src={selectedPolicy.document}
              alt="Document"
              className="w-full max-h-64 object-contain rounded mb-4"
            />
            <div className="space-y-2 text-sm">
              <p><strong>Policy Name:</strong> {selectedPolicy.policy_name}</p>
              <p><strong>Amount:</strong> ${selectedPolicy.policy_amount}</p>
              <p><strong>Claim Status:</strong> {selectedPolicy.claim_status}</p>
              <p><strong>Reason:</strong> {selectedPolicy.reason}</p>
              <p><strong>User Email:</strong> {selectedPolicy.user_email}</p>
              <p><strong>Requested At:</strong> {new Date(selectedPolicy.requested_at).toLocaleString()}</p>
              <p><strong>Policy ID:</strong> {selectedPolicy.policyId}</p>
            </div>
            <div className="modal-action">
               <button
                                        className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
              <button className="btn btn-sm" onClick={() => setSelectedPolicy(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyClearance;
