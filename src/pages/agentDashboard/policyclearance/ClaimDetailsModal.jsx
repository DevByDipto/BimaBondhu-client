import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const ClaimDetailsModal = ({ claim, onClose }) => {
  if (!claim) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Claim Details</h2>
        <div className="space-y-2">
          <p><strong>Policy Name:</strong> {claim.policy_name}</p>
          <p><strong>Amount:</strong> ${claim.policy_amount}</p>
          <p><strong>User Email:</strong> {claim.user_email}</p>
          <p><strong>Reason:</strong> {claim.reason}</p>
          <p><strong>Status:</strong> {claim.claim_status}</p>
          <img
            src={claim.document}
            alt="Claim Document"
            className="w-full h-auto border rounded"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="btn btn-sm btn-outline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ClaimPolicyClearance = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  const { data: claims = [], isLoading, refetch } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const res = await axios.get('/claims');
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(`/claims/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        alert('Claim Approved');
        refetch();
      }
    } catch (error) {
      console.error('Approve error:', error);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Policy Clearance Requests</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Policy Name</th>
              <th>Amount</th>
              <th>User Email</th>
              <th>Status</th>
              <th>Details</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, idx) => (
              <tr key={claim._id}>
                <td>{idx + 1}</td>
                <td>{claim.policy_name}</td>
                <td>${claim.policy_amount}</td>
                <td>{claim.user_email}</td>
                <td>{claim.claim_status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedClaim(claim)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleApprove(claim._id)}
                    disabled={claim.claim_status === 'approved'}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClaim && (
        <ClaimDetailsModal
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
        />
      )}
    </div>
  );
};

export default ClaimPolicyClearance;
