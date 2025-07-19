import { useForm } from "react-hook-form";
import { useEffect } from "react";

const EditPolicyModal = ({ policy, isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (policy) {
      reset(policy);
    }
  }, [policy, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, _id: policy._id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog id="edit_policy_modal" className="modal modal-open">
      <div className="modal-box max-w-4xl bg-base-100">
        <h3 className="font-bold text-lg mb-4">✏️ Edit Policy</h3>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Title</label>
            <input {...register("title")} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Category</label>
            <input {...register("category")} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Image URL</label>
            <input {...register("image")} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Coverage Amount</label>
            <input type="number" {...register("coverage_amount")} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Premium / Month</label>
            <input type="number" {...register("premium_per_month")} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Eligibility Age</label>
            <input {...register("eligibility_age")} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Term Length (Years)</label>
            <input type="number" {...register("term_length_years")} className="input input-bordered w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="label">Short Description</label>
            <textarea {...register("short_description")} className="textarea textarea-bordered w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="label">Full Description</label>
            <textarea {...register("full_description")} className="textarea textarea-bordered w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="label">Benefits (Comma separated)</label>
            <input {...register("benefits")} className="input input-bordered w-full" />
          </div>

          <div className="modal-action col-span-full">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditPolicyModal;
