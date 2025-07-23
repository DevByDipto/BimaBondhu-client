import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ProfilePage = () => {
  // console.log("console from profile");
  
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', photo: '' });

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user-info', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
// console.log(userInfo);

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
        // console.log(updatedData);
        
      const res = await axiosSecure.put(`/users/${user.email}`, updatedData);
// console.log(res);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-info', user?.email]);
      setIsModalOpen(false);
    },
  });

  if (loading || isLoading) return <p className="text-center py-10">Loading user profile...</p>;
  if (isError) return <p className="text-center text-red-500">❌ Failed to load user data</p>;

  const lastLogin = new Date(user?.metadata?.lastSignInTime).toLocaleString();

  const openModal = () => {
    setFormData({
      name: userInfo?.name || user?.displayName || '',
      photo: user?.photoURL || '',
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-lg shadow-md">
      <title>Profile Page</title>
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex justify-center mb-4">
        <img
          src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border"
        />
      </div>

      <div className="space-y-2">
        <p><strong>Name:</strong> { userInfo?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Last Login:</strong> {lastLogin}</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={openModal}
          className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className=" p-6 bg-gray-700 rounded-lg w-96 relative">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
