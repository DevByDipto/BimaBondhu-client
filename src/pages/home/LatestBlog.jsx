import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

import useAxios from '../../hooks/useAxios';

const LatestBlog = () => {
    const axiosInstance = useAxios()
    const navigate = useNavigate()
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: async () => {
      const res = await axiosInstance.get('/blogs');
      // console.log({res},"axiosInstance response");
      
      return res.data;
    },
  });
// console.log({blogs});

  // ব্লগ গুলো ডেট অনুযায়ী sort করে latest ৪টা নিচ্ছি
  const latestBlogs = blogs
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 4);

  if (isLoading) return <p className="text-center">Loading...</p>;
 const handleReadMore = async (id) => {
        
    try {
      await axiosInstance.patch(`/blogs/${id}/increment-visit`);
      navigate(`/blogDetails/${id}`);
    } catch (error) {
      console.error("Failed to increment visit count", error);
    }
  };

  return (
    <section className="my-10 max-w-6xl mx-auto px-4 mt-20 md:mt-32">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Latest Blogs & Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {latestBlogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 rounded-xl shadow-xl  border-gray-100 border-x-2 border-t-2">
            <figure>
              <img src={blog.coverImage} alt={blog.title} className="w-full h-52 object-cover" />
            </figure>
            <div className="card-body bg-blue-500 rounded-xl">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <div className="card-actions justify-end mt-4">
                <button to={`/blogDetails/${blog._id}`} className="btn btn-sm btn-accent" onClick={()=>handleReadMore(blog._id)}>
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/blogs" className="btn btn-primary">All Blogs</Link>
      </div>
    </section>
  );
};

export default LatestBlog;



