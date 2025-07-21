import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import HelmetTitle from '../../components/HelmetTitle';

const PoliciesDetails = () => {
  const { id } = useParams(); // 👉 URL থেকে ID নেওয়া হচ্ছে
  const axiosInstance = useAxios(); // 👉 axios instance
const navigation = useNavigate()
  // 📦 fetch policy by ID
  const { data: policy = {}, isLoading } = useQuery({
    queryKey: ['policy', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/policies/?id=${id}`);
      return res.data.data;
    }
  });
  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  console.log(policy);
  

  // 💡 প্রিমিয়াম ক্যালকুলেশন লজিক (বর্ণনা সহ)
  const coverageAmount = policy.coverage_amount || 0;
  const premiumPerMonth = policy.premium_per_month || 0;
  const termInYears = policy.term_length_years || 1;
  const totalPaid = premiumPerMonth * 12 * termInYears;

  return (
    <section>
       <HelmetTitle>Policies Details</HelmetTitle>
    <div className="max-w-2xl mx-auto border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-6 bg-white space-y-4">
      {/* Title and Category */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{policy.title}</h2>
        <span className="text-sm font-semibold text-white bg-blue-500 rounded-full px-3 py-1 mt-2 md:mt-0">
          {policy.category}
        </span>
      </div>

      {/* Image */}
      <img
        src={policy.image}
        alt={policy.title}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Short & Full Description */}
      <p className="text-gray-600 font-medium">
        {policy.short_description}
      </p>
      <p className="text-gray-700">{policy.full_description}</p>

      {/* Eligibility and Term */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Coverage:</span><br />
          ৳{coverageAmount.toLocaleString()}
        </div>
        <div>
          <span className="font-semibold">Monthly Premium:</span><br />
          ৳{premiumPerMonth}
        </div>
        <div>
          <span className="font-semibold">Eligible Age:</span><br />
          {policy.eligibility_age}
        </div>
        <div>
          <span className="font-semibold">Term:</span><br />
          {termInYears} years
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h4 className="font-semibold text-gray-800 mt-4 mb-2">Benefits:</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {policy.benefits?.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {/* 🔍 Premium Calculation Logic Explanation */}
      <div className="bg-gray-100 p-4 rounded-lg text-gray-700 mt-6">
        <h4 className="font-semibold mb-2">Premium Calculation Logic:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Fixed monthly premium: ৳{premiumPerMonth}</li>
          <li>Policy term: {termInYears} years = {termInYears * 12} months</li>
          <li>Total premium payable over the full term: <strong>৳{totalPaid.toLocaleString()}</strong></li>
          <li>Coverage amount: <strong>৳{coverageAmount.toLocaleString()}</strong></li>
         <li>
  That means, over {termInYears} years, you will pay a total of <strong>৳{totalPaid.toLocaleString()}</strong> in premiums, and in return, you will receive life coverage of <strong>৳{coverageAmount.toLocaleString()}</strong>.
</li>

        </ul>
      </div>

      {/* CTA Button */}
      <div className="text-right pt-4">
        <button
          onClick={() => navigation(`/get-quote/${policy._id}`) }
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
        >
          Get Quote
        </button>
      </div>
    </div>
    </section>
  );
};

export default PoliciesDetails;
