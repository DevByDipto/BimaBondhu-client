import { useForm } from 'react-hook-form';
import { formatISO } from 'date-fns';
import useAuth from '../../../hooks/useAuth';
import useUserRole from '../../../hooks/useUserRole';

const AddNewBlogModal = ({ isOpen, onClose, onAdd }) => {
  const { user } = useAuth();
  const {role,roleLoder} = useUserRole()
  console.log(role);
  
  if(roleLoder){
    return "loading......"
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const blogData = {
      ...data,
      isPublished: data.isPublished === 'true' || data.isPublished === true,
      publishedAt: formatISO(new Date()), // auto set date
      author_name: user?.displayName || "Unknown",
      author_image: user?.photoURL || "",
      author_role: role, // default role
      email: user?.email || "",
      totalVisit: 0,
    };

    onAdd(blogData);
    reset();
    onClose();
  };

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box max-w-3xl w-full">
        <h3 className="font-bold text-lg mb-4">Add New Blog</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title</label>
              <input {...register('title', { required: true })} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Excerpt</label>
              <input {...register('excerpt')} className="input input-bordered w-full" />
            </div>
            <div className="col-span-2">
              <label className="label">Content</label>
              <textarea {...register('content')} className="textarea textarea-bordered w-full" rows="4" />
            </div>
            <div>
              <label className="label">Cover Image URL</label>
              <input {...register('coverImage')} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Author (Read-only)</label>
              <input value={user?.displayName || ''} className="input input-bordered w-full" readOnly />
            </div>
            <div>
              <label className="label">Author Image URL</label>
              <input value={user?.photoURL || ''} className="input input-bordered w-full" readOnly />
            </div>
            <div>
              <label className="label">Publish Blog?</label>
              <select {...register('isPublished')} className="select select-bordered w-full">
                <option value="false">Draft</option>
                <option value="true">Published</option>
              </select>
            </div>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Add Blog</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddNewBlogModal;
