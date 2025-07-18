import React from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import useUserRole from '../hooks/useUserRole';

const AdmineRoute = ({children}) => {
 const { user, loading } = useAuth();
 const {role,roleLoder} = useUserRole();
  const location = useLocation();
  

  if (loading || roleLoder) {
    return <div className="text-center py-10">Loading...</div>; // ⏳ যদি auth লোড হয়
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/forbiden" state={location.pathName} replace />;
  }

  return children; 
}

export default AdmineRoute