import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AgentInfoModal = ({ user, isOpen, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Patch user role to agent
  const updateUserRoleMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/${id}`, { role: 'agent' }),
    onError: () => {
      Swal.fire("❌ Failed", "Could not update user role", "error");
    }
  });

  // Add agent info
  const addAgentMutation = useMutation({
    mutationFn: (agentData) => axiosSecure.post("/agents", agentData),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire("✅ Success", "Agent info saved and role updated", "success");
      onClose();
      reset();
    },
    onError: () => {
      Swal.fire("❌ Failed", "Could not save agent info", "error");
    }
  });

  const onSubmit = async (data) => {
    try {
      await updateUserRoleMutation.mutateAsync(user._id);

      const agentPayload = {
        email: user.email,
        name: user.name,
        photo: data.photo,
        phone: data.phone,
        experience: parseInt(data.experience),
        rating: parseFloat(data.rating),
        specialties: data.specialties.split(",").map(s => s.trim()),
      };

      await addAgentMutation.mutateAsync(agentPayload);
    } catch (error) {
      // handled by onError in mutations
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div className="bg-gray-300 p-6 rounded-lg w-96 space-y-4">
        <h3 className="text-xl font-semibold">Agent Info for {user.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("photo", { required: true })}
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />

          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />

          <input
            {...register("experience", { required: true })}
            type="number"
            placeholder="Experience (years)"
            className="input input-bordered w-full"
          />

          <input
            {...register("rating", { required: true })}
            type="number"
            step="0.1"
            placeholder="Rating (1-5)"
            className="input input-bordered w-full"
          />

          <input
            {...register("specialties", { required: true })}
            placeholder="Specialties (comma separated)"
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { reset(); onClose(); }} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentInfoModal;
