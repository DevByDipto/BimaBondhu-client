import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

const QuotePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [estimatedPremium, setEstimatedPremium] = useState(null);
const {id} = useParams()

  const calculatePremium = (data) => {
    const baseRatePerThousand = 10;
    const coverageInThousands = data.coverageAmount / 1000;

    let premium = baseRatePerThousand * coverageInThousands;

    if (data.smoker === 'yes') {
      premium *= 1.2;
    }

    if (data.age > 30) {
      premium *= 1 + (data.age - 30) * 0.02;
    }

    if (data.duration > 10) {
      premium *= 1 - (data.duration - 10) * 0.01;
    }

    return premium.toFixed(2);
  };

  const onSubmit = (data) => {
    const monthlyPremium = calculatePremium(data);
    setEstimatedPremium(monthlyPremium);
  };

  return (
    <section>
      <title>Quote</title>
   
    <div className="max-w-md mx-auto p-6  rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Get Your Life Insurance Quote</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Age */}
        <div>
          <label className="block mb-1 font-semibold">Age</label>
          <input
            type="number"
            {...register('age', { required: "Age is required", min: { value: 18, message: "Minimum age is 18" }, max: { value: 100, message: "Maximum age is 100" } })}
            className={`w-full border rounded px-3 py-2 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your age"
          />
          {errors.age && <p className="text-red-600 mt-1 text-sm">{errors.age.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            {...register('gender', { required: "Gender is required" })}
            className={`w-full border rounded px-3 py-2 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-600 mt-1 text-sm">{errors.gender.message}</p>}
        </div>

        {/* Coverage Amount */}
        <div>
          <label className="block mb-1 font-semibold">Coverage Amount (৳)</label>
          <input
            type="number"
            {...register('coverageAmount', { required: "Coverage Amount is required", min: { value: 10000, message: "Minimum coverage is 10,000" } })}
            className={`w-full border rounded px-3 py-2 ${errors.coverageAmount ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter coverage amount"
          />
          {errors.coverageAmount && <p className="text-red-600 mt-1 text-sm">{errors.coverageAmount.message}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-semibold">Duration (years)</label>
          <input
            type="number"
            {...register('duration', { required: "Duration is required", min: { value: 1, message: "Minimum duration is 1 year" }, max: { value: 30, message: "Maximum duration is 30 years" } })}
            className={`w-full border rounded px-3 py-2 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter policy duration"
          />
          {errors.duration && <p className="text-red-600 mt-1 text-sm">{errors.duration.message}</p>}
        </div>

        {/* Smoker */}
        <div>
          <label className="block mb-1 font-semibold">Smoker</label>
          <select
            {...register('smoker', { required: "Please select smoker status" })}
            className={`w-full border rounded px-3 py-2 ${errors.smoker ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.smoker && <p className="text-red-600 mt-1 text-sm">{errors.smoker.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Display Estimated Monthly
          </button>

          <button
            type="button"
            onClick={() => navigate(`/application-form/${id}`)}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Apply for Policy
          </button>
        </div>
      </form>

      {/* Show estimated premium */}
      {estimatedPremium && (
        <p className="mt-6 text-center text-lg font-semibold text-green-700">
          Estimated Monthly Premium: ৳{estimatedPremium}
        </p>
      )}
    </div>
     </section>
  );
};

export default QuotePage;
