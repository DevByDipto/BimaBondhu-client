import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import AgentInfoModal from './AgentInfoModal';

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedUserForAgent, setSelectedUserForAgent] = useState(null);

  // Load all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('✅ Deleted!', 'User has been removed.', 'success');
    },
    onError: () => {
      Swal.fire('❌ Error', 'Something went wrong!', 'error');
    }
  });

  // Update role mutation for non-agent roles
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return await axiosSecure.patch(`/users/${id}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('✅ Role Changed', 'User role updated successfully', 'success');
    },
    onError: () => {
      Swal.fire('❌ Error', 'Failed to update role', 'error');
    }
  });

  // Delete agent data mutation
  const deleteAgentMutation = useMutation({
    mutationFn: async (email) => {
      return await axiosSecure.delete(`/agents/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('✅ Agent data removed', 'Agent info deleted successfully', 'success');
    },
    onError: () => {
      Swal.fire('❌ Error', 'Failed to delete agent info', 'error');
    }
  });

  const handleDelete = (user) => {
    Swal.fire({
      title: `Are you sure to delete ${user.name}?`,
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(user._id);
      }
    });
  };

  const handleRoleChange = (userId, newRole, userObj) => {
    if (newRole === "agent") {
      setSelectedUserForAgent(userObj); // modal open করো agent info দেওয়ার জন্য
    } else {
      if (userObj.role === "agent") {
        // agent থেকে অন্য রোলে গেলে agent data মুছে ফেলো
        deleteAgentMutation.mutate(userObj.email);
      }
      updateRoleMutation.mutate({ id: userId, role: newRole });
    }
    setOpenDropdownId(null);
  };

  if (isLoading) return <p className="text-center">Loading users...</p>;

  return (
    <div className="p-4">
      <title>Manage Users</title>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered</th>
              <th>Change Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {console.log(user,user.create_at)
                }
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === user._id ? null : user._id)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      Change Role
                    </button>
                    {openDropdownId === user._id && (
                      <div className="absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1 text-sm text-gray-700">
                          <button
                            onClick={() => handleRoleChange(user._id, 'customer', user)}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            Customer
                          </button>
                          <button
                            onClick={() => handleRoleChange(user._id, 'agent', user)}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            Agent
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Agent Info Modal */}
      <AgentInfoModal
        user={selectedUserForAgent}
        isOpen={!!selectedUserForAgent}
        onClose={() => setSelectedUserForAgent(null)}
      />
    </div>
  );
};

export default ManageUsers;
