import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/claims');
      return res.data;
    }
  });

  const totalIncome = transactions?.reduce((sum, item) => {
  if (item.claim_status === 'pending' || item.claim_status === 'aproved' ) {
   
    
    const amount = item.policy_amount ? Number(item.policy_amount ) : 0
// console.log(amount);

    return sum + amount;
  }
  return sum;
}, 0);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
            <title>Manage Transactions</title>

      <h2 className="text-2xl font-semibold mb-4">Manage Transactions</h2>

      <div className="mb-4 text-xl font-medium">
        ✅ Total Income from Policy Sales: <span className="text-green-600">${totalIncome}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Customer Email</th>
              <th>Policy Name</th>
              <th>Paid Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx._id}>
                <td>{index + 1}</td>
                <td>{tx._id}</td>
                <td>{tx.user_email}</td>
                <td>{tx.policy_name}</td>
                <td>${tx.policy_amount}</td>
                <td>{format(new Date(tx.requested_at), 'PPP p')}</td>
                <td className=''>Success</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions;
