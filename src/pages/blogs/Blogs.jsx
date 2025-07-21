import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';

const Blogs = () => {
    const navigate = useNavigate()
    const axiosInstance = useAxios()
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosInstance.get('/blogs');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

    const handleReadMore = async (id) => {
        console.log(id);
        
    try {
      await axiosInstance.patch(`/blogs/${id}/increment-visit`);
      navigate(`/blogDetails/${id}`);
    } catch (error) {
      console.error("Failed to increment visit count", error);
    }
  };


  return (
    <section>
      <title>Blogs</title>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {blogs.map((blog) => (
        <div key={blog._id} className=" rounded-xl shadow-md overflow-hidden">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />

          <div className="p-4">
            <h2 className="text-xl font-semibold">{blog.title}</h2>

            <p className="text-gray-700 text-sm my-2">
              {blog.content.split(' ').slice(0, 30).join(' ')}...
            </p>

            <div className="flex items-center gap-3 mt-3">
              <img
                src={blog.author_image}
                alt={blog.author_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{blog.author_name}</h4>
                <span className="badge badge-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {blog.author_role}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              <p>📅 {new Date(blog.publishedAt).toLocaleDateString()}</p>
              <p>👁️ {blog.totalVisit} visits</p>
            </div>
 <button
      onClick={() => handleReadMore(blog._id)}
      className="mt-3 btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
    >
      Read More
    </button>
          </div>
        </div>
      ))}
    </div>
      </section>
  );
};

export default Blogs;
