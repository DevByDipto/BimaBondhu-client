import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router";
import HelmetTitle from "../../components/HelmetTitle";

const AllPolicies = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 9;
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate()
const [policiesData,setPoliciesData] = useState()

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allPolicies", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/policies?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const totalPolicies = data?.total || 0;
  const totalPages = Math.ceil(totalPolicies / limit);

   useEffect(()=>{
    setPoliciesData(data)

  },[data])

  if (isLoading) {
    return "loding........";
  }
  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  }
 

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 border rounded-md ${
            page === i ? "bg-blue-600 text-white" : "bg-white text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }
  };
  const categories = data?.data?.map((p)=> p.category)
// console.log(categories);
  
const handleSelect = async(e)=>{
  // setSelectedCategory(e.target.value)
  const selecttedCatagory= e.target.value
  console.log(e.target.value);
  
  const res = await axiosInstance.get(
        `/policies?category=${selecttedCatagory}`
      );
      console.log(res.data.data);
      setPoliciesData(res.data)
      return res.data.data;
}

  const handleClick = (id) => {
    navigate(`/policies-details/${id}`);
  };
  
  return (

    <section>
      <title>All Policies</title>
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        All Insurance Policies
      </h2>
       <select
        value={selectedCategory}
        onChange={(e) => handleSelect(e)}
        className="select select-bordered w-full max-w-sm mb-6"
      >
        <option value="">-- Select Category --</option>
        {categories?.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading policies...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policiesData?.data?.map((policy) => (
              <div
                key={policy._id}
                className="rounded-2xl shadow-md hover:shadow-xl transition border border-gray-200"
                onClick={()=>handleClick(policy._id)}
              >
                {policy?.image && (
                  <div className="p-4 ">
  <img
    src={policy.image}
    alt={policy?.title}
    className="w-full h-48 object-cover rounded-lg"
  />
  </div>
)}
                <div className="mt-4 bg-blue-500 p-4 ">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-white font-medium mt-1">
                    {policy.category}
                  </p>
                  <p className="mt-2 text-gray-600 text-sm">
                    {policy.short_description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num + 1)}
                className={`px-4 py-2 border rounded ${
                  page === num + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="text-center mt-5">
        <button
          className="btn-primary mr-5"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          className="btn-primary mr-5"
          disabled={page === totalPages}
          onClick={() => policiesData.data.length >= 9 && setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </section>
  );
};

export default AllPolicies;
