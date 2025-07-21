import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import EditBlogModal from './EditBlogModal';
import AddNewBlogModal from './AddNewBlogModal';

const ManageBlogs = () => {
  const { role, roleLoder: roleLoading } = useUserRole();
console.log(role);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = user.email;

  const {
    data: blogs = [],
    refetch,
    isLoading: blogLoading,
  } = useQuery({
    queryKey: ['blogs', role, email],
    enabled: !roleLoading && !!role,
    queryFn: async () => {
      if (role === 'admin') {
        const res = await axiosSecure.get('/blogs');
        return res.data;
      } else if (role === 'agent') {
        const res = await axiosSecure.get(`/blogs?email=${email}`);
        return res.data;
      } else {
        return [];
      }
    },
  });
console.log(blogs);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/blogs/${id}`);
        await Swal.fire("Deleted!", "Blog has been deleted.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Failed!", "Blog could not be deleted.", "error");
      }
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleUpdate = async (id, updatedData) => {
    
    try {
      await axiosSecure.patch(`/blogs/${id}`, updatedData);
      Swal.fire("Updated!", "Blog has been updated.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Failed!", "Blog update failed.", "error");
    }
  };

  const handleAdd = async (newBlog) => {
    console.log(newBlog);
    
    try {
      await axiosSecure.post('/blogs', newBlog);
      refetch();
      Swal.fire('Success!', 'New blog added!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to add blog', 'error');
    }
  };

  if (roleLoading || blogLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <title>Manage Blogs</title>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
         <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>Add New Blog</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Author</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{blog.title}</td>
                <td>
                  <div className="max-w-xs text-sm line-clamp-3">{blog.content}</div>
                </td>
                <td>{blog.author_name}</td>
                <td>{format(new Date(blog.publishedAt), 'PPP')}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No blogs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
       {isAddOpen && (
        <AddNewBlogModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default ManageBlogs;
