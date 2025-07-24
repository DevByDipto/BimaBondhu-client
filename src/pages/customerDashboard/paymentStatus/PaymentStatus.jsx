import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const PaymentStatus = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
 const navigate = useNavigate()
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['application-details'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applicationDetails-by-email?email=${user.email}`);
      return res.data; // এটা এখন array হবে
    }
  });
// console.log(applications,user.email);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!applications.length) return <p className="text-center">No application found</p>;
// console.log(applications);

  // ✅ filter only approved applications
  const approvedApplications = applications.filter(app => app.application_status === 'approved');
// console.log(applications);

  return (
    <div className="overflow-x-auto  m-5">
      <title>Payment Status</title>
        <h2 className='text-center mt-10 text-3xl font-bold'>Payment Status</h2>
      <table className="table  border border-gray-300 mt-5">
        <thead className="">
          <tr>
            <th>#</th>
            <th>Policy Title</th>
            <th>Premium / Month</th>
            <th>Payment Frequency</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {approvedApplications.map((app, index) => (
            <tr key={app._id} className="border-t">
              <td>{index + 1}</td>
              <td>{app.policyDetails?.title || 'N/A'}</td>
              <td>${app.policyDetails?.premium_per_month}</td>
              <td>Monthly</td>
              <td>
                <span
                  className={`font-bold ${
                    app.payment_status === 'due' ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {app.payment_status ?  app.payment_status?.toUpperCase() : "DUE"}
                </span>
              </td>
                {/* {console.log(app.payment_status)
                } */}
              <td>
                <button
                  disabled={app.payment_status === 'paid'}
                  className={`px-4 py-1 rounded ${
                    app.payment_status === 'paid' ? 'bg-gray-300 text-black cursor-not-allowed' : 'bg-green-500 text-white'
                  }`}
                  onClick={()=>navigate(`/dashboard/payment/${app.policyDetails._id}`)}
                >
                  {app.payment_status === 'paid' ? 'Already Paid' : 'Pay Now'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStatus;
