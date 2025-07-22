import React from 'react'
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminAndAgentRoute = ({children}) => {
  const {  loading } = useAuth();
 const {role,roleLoder} = useUserRole();
  const location = useLocation();

  

  if (loading || roleLoder) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if(role == 'agent' || role == "admin"){
      return children
  }

 return <Navigate to="/forbiden" state={location.pathName} replace />;
}

export default AdminAndAgentRoute