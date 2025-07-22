import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddPolicyModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();
  const [PhotofileUrl, setPhotofileUrl] = useState();

  const handleFormSubmit = (data) => {
    const benefitsArray = data.benefits.split(",").map(item => item.trim());
    // console.log(benefitsArray);
    
    const someFormData= {
      benefits:benefitsArray,
      coverage_amount: Number(data.coverage_amount),
      premium_per_month: Number(data.premium_per_month),
      term_length_years: Number(data.term_length_years),
      image: PhotofileUrl,
      purchased: Number(0),
    }
    onSubmit({ ...data, ...someFormData });
    reset();
    onClose();
  };

  const handleFileImageSubmite = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;

    const res = await axios.post(imageUploadUrl, formData);
    setPhotofileUrl(res.data.data.url);
    //   setProfilePic(res.data.data.url);
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl w-full bg-base-100">
            <h3 className="font-bold text-xl mb-4">➕ Add New Policy</h3>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2"
            >
              <div>
                <label className="label">Policy Title</label>
                <input
                  {...register("title")}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Category</label>
                <select
                  {...register("category")}
                  className="select select-bordered w-full"
                >
                  <option value="Term Life">Term Life</option>
                  <option value="Senior">Senior</option>
                  <option value="Whole Life">Whole Life</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="label">Full Description</label>
                <textarea
                  {...register("full_description")}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="label"> Short Description</label>
                <textarea
                  {...register("short_description")}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Coverage Amount</label>
                <input
                  type="number"
                  {...register("coverage_amount")}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              

              <div>
                <label className="label">Premium/Month</label>
                <input
                  type="number"
                  {...register("premium_per_month")}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Term Length (years)</label>
                <input
                  type="number"
                  {...register("term_length_years")}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Eligibility Age</label>
                <input
                  type="text"
                  {...register("eligibility_age")}
                  className="input input-bordered w-full"
                  placeholder="e.g. 18-60"
                  required
                />
              </div>

              

              <div className="md:col-span-2">
                {/* <label className="label">Policy Image URL</label>
                <input type="text" {...register("image")} className="input input-bordered w-full" /> */}
                {/* image file */}
                <label className="label block">Policy Image</label>
                <input
                  onChange={handleFileImageSubmite}
                  type="file"
                  name="file"
                  className="file-input file-input-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Benefits (comma separated)</label>
                <input
                  type="text"
                  {...register("benefits")}
                  className="input input-bordered w-full"
                />
              </div>
            </form>

            <div className="modal-action">
              <button
                onClick={handleSubmit(handleFormSubmit)}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button onClick={onClose} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPolicyModal;
