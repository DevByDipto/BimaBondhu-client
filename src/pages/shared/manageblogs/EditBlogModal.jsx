import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const EditBlogModal = ({ blog, isOpen, onClose, onUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: blog,
  });

  const onSubmit = (data) => {
      const { _id, ...updateData } = data;
      // console.log(updateData);
    
    onUpdate(blog._id, updateData);
    reset();
    onClose();
  };

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box max-w-3xl w-full">
        <h3 className="font-bold text-lg mb-4">Edit Blog</h3>
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
              <label className="label">Author Name</label>
              <input {...register('author_name')} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Author Role</label>
              <input {...register('author_role')} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Author Image URL</label>
              <input {...register('author_image')} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Email</label>
              <input {...register('email')} className="input input-bordered w-full" readOnly/>
            </div>
            <div>
              <label className="label">Total Visit</label>
              <input type="number" {...register('totalVisit')} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Published Date</label>
              <input
                type="date"
                {...register('publishedAt')}
                defaultValue={format(new Date(blog.publishedAt), 'yyyy-MM-dd')}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="label">Published?</label>
              <input type="checkbox" {...register('isPublished')} defaultChecked={blog.isPublished} className="toggle" />
            </div>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditBlogModal;
