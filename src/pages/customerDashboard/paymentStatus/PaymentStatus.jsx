import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure'; // adjust path as needed
import { Button } from "@/components/ui/button";

const PaymentStatus = () => {
  const { data: application, isLoading } = useQuery({
    queryKey: ['application-details'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/application-details`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (!application) return <p>No application found</p>;

  const { payment_status, policyDetails } = application;

  return (
    <div className="bg-white shadow p-4 rounded-xl w-full max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-center">Payment Status</h2>

      <div className="space-y-2">
        <p><span className="font-medium">Premium Per Month:</span> ${policyDetails?.premium_per_month}</p>
        <p><span className="font-medium">Payment Frequency:</span> Monthly</p>
        <p><span className="font-medium">Status:</span> 
          <span className={`ml-2 font-bold ${payment_status === "due" ? "text-red-500" : "text-green-600"}`}>
            {payment_status?.toUpperCase()}
          </span>
        </p>
      </div>

      <div className="text-center">
        <Button
          disabled={payment_status === "paid"}
          className="w-full"
        >
          {payment_status === "paid" ? "Already Paid" : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentStatus;
