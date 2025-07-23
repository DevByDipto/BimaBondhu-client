import Swal from "sweetalert2";
import React, { useState } from "react";
import { useParams } from "react-router";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const healthOptions = [
  { value: "diabetes", label: "Diabetes" },
  { value: "heart_disease", label: "Heart Disease" },
  { value: "smoking", label: "Smoking" },
  { value: "asthma", label: "Asthma" },
];

const ApplicationForm = () => {
  const { policyId } = useParams();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    nid: "",
    nomineeName: "",
    nomineeRelation: "",
    health: [],
  });

  // ✅ Query to check if already applied
  const {
    data: alreadyApplied = false,
    isLoading: isAppliedLoading,
    refetch,
  } = useQuery({
    queryKey: ["already-applied", user?.email, policyId],
    enabled: !!user?.email && !!policyId, // Ensure query doesn't run until values are available
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${user.email}`);
      const found = res.data?.find((item) => item.policyId === policyId);
      return !!found;
    },
  });

  if (loading || isAppliedLoading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHealthChange = (selectedOptions) => {
    const values = selectedOptions.map((opt) => opt.value);
    setFormData({ ...formData, health: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      policyId,
      email: user?.email || "",
      application_status: "pending",
      agent_status: "pending",
    };

    try {
      await axiosSecure.post("/applications", applicationData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Application added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      refetch(); // ✅ Refetch after submit to update alreadyApplied
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Submission failed!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <section>
      <title>Application Form</title>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply for Insurance
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-5  p-6 rounded-xl shadow"
        >
          {/* Applicant Info */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded p-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded p-2 "
              value={user?.email}
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border rounded p-2"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">NID Number</label>
            <input
              type="text"
              name="nid"
              className="w-full border rounded p-2"
              value={formData.nid}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nominee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Nominee Name</label>
              <input
                type="text"
                name="nomineeName"
                className="w-full border rounded p-2"
                value={formData.nomineeName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Relationship</label>
              <input
                type="text"
                name="nomineeRelation"
                className="w-full border rounded p-2"
                value={formData.nomineeRelation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Health Disclosure */}
          <div>
            <label className="block font-medium mb-1">Health Disclosure</label>
            <Select
              isMulti
              options={healthOptions}
              className="basic-multi-select text-black"
              classNamePrefix="select"
              onChange={handleHealthChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={alreadyApplied}
            className={`w-full font-semibold py-2 rounded ${
              alreadyApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {alreadyApplied ? "Already Applied" : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;
