import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const BlogDetails = () => {
  const { blogId } = useParams();
  const axiosInstance = useAxios()

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog-details', blogId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs?id=${blogId}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <img
        src={blog.coverImage}
        alt="Blog Cover"
        className="w-full h-64 object-cover rounded-xl shadow"
      />
      <h1 className="text-3xl font-bold">{blog.title}</h1>

      <div className="flex items-center gap-4">
        <img
          src={blog.author_image}
          alt="Author"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold">{blog.author_name} <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded">{blog.author_role}</span></p>
          <p className="text-sm text-gray-500">Published on {new Date(blog.publishedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{blog.content}</p>

      <div className="pt-4 border-t text-sm text-gray-500">
        Total Visits: <span className="font-semibold">{blog.totalVisit}</span>
      </div>
    </div>
  );
};

export default BlogDetails;
