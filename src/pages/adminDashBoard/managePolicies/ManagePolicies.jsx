import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import EditPolicyModal from "./EditPolicyModal";
import AddPolicyModal from "./AddPolicyModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePolicies = () => {
  const queryClient = useQueryClient();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // ✅ fetch policies
  const { data: policies = [], isLoading, isError } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/policies");
      return res.data.data;
    },
  });

  // ✅ update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedPolicy) => {
      const res = await axiosSecure.put(`/policies/${updatedPolicy._id}`, updatedPolicy);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["policies"]);
      Swal.fire("Updated!", "Policy updated successfully", "success");
    },
  });

  // ✅ add mutation
  const addMutation = useMutation({
    mutationFn: async (newPolicy) => {
        // console.log({newPolicy});
        
    //   const formData = new FormData();
    //   Object.entries(newPolicy).forEach(([key, value]) => {
    //     formData.append(key, value);
    //   });
    //   console.log(formData);
      
      const res = await axiosSecure.post("/policies", newPolicy);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["policies"]);
      Swal.fire("Added!", "New policy added successfully", "success");
      setIsAddModalOpen(false);
    },
  });

  const handleEditClick = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedPolicy) => {
    updateMutation.mutate(updatedPolicy);
  };

  const handleAddNew = (newPolicy) => {
    addMutation.mutate(newPolicy);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/policies/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["policies"]);
    },
  });

 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this policy?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMutation.mutate(id);
      Swal.fire("Deleted!", "The policy has been deleted successfully.", "success");
    }
  });
};


  if (isLoading) return <div className="text-center my-10">Loading policies...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load policies</div>;

  return (
    <div className="p-4">
      <title>Managem Policies</title>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">📋 Manage Policies</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
          ➕ Add New Policy
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Term</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {policies?.map((policy, index) => (
              <tr key={policy._id}>
                <td>{index + 1}</td>
                <td>{policy.title}</td>
                <td>{policy.category}</td>
                <td>৳{policy.coverage_amount}</td>
                <td>৳{policy.premium_per_month}</td>
                <td>{policy.term_length_years} yrs</td>
                <td>
                  <button className="btn btn-sm btn-outline btn-info" onClick={() => handleEditClick(policy)}>
                    Edit
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(policy._id)}
                    className="text-red-600 border border-red-600 p-[6px] rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Edit Modal */}
      <EditPolicyModal
        policy={selectedPolicy}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
      />

      {/* ✅ Add Modal */}
      <AddPolicyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddNew}
      />
    </div>
  );
};

export default ManagePolicies;
