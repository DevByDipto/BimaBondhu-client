import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from '../pages/authentication/login/Login'
import '../../src/App.css'
import Register from "../pages/authentication/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from '../router/PrivateRoute'
import ForbiddenPage from "../components/ForbiddenPage";
import AllPolicies from "../pages/AllPolicies/AllPolicies";
import PoliciesDetails from "../pages/AllPolicies/PoliciesDetails";
import ManagePolicies from "../pages/adminDashBoard/managePolicies/ManagePolicies";
import QuotePage from "../pages/quotePage/QuotePage";
import ApplicationForm from "../pages/applicationForm/ApplicationForm";
import ApplicationDetails from "../pages/shared/applicationsDetails/ApplicationDetails";
import ManageApplications from "../pages/adminDashBoard/manageApplications/ManageApplications";
import MyPolicies from "../pages/customerDashboard/myPolicies/MyPolicies";
import Blogs from "../pages/blogs/Blogs";
import BlogDetails from "../pages/blogs/blogDetails/blogDetails";
import ManageBlogs from "../pages/shared/manageblogs/ManageBlogs";
import ManageUsers from "../pages/adminDashBoard/manageUsers/ManageUsers";
import AssignedCustomers from "../pages/agentDashboard/assignedCustomers/AssignedCustomers";
import ProfilePage from "../pages/shared/profilePage/ProfilePage";
import PaymentStatus from "../pages/customerDashboard/paymentStatus/PaymentStatus";
import Payment from "../pages/customerDashboard/payment/Payment";
import ClaimRequest from "../pages/customerDashboard/claimRequest/ClaimRequest";
import PolicyClearance from "../pages/agentDashboard/policyclearance/policyclearance";
import ManageTransactions from "../pages/agentDashboard/manageTransactions/ManageTransactions";
import RejectedApplications from "../pages/customerDashboard/rjectedApplications/RejectedApplications";
import AdmineRoute from "../router/AdmineRoute";
import AgentRoute from "../router/AgentRoute";
import AdminAndAgentRoute from "../router/adminAndAgentRoute";
import CustomerRoute from "../router/CustomerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
     {index:true,
      element:<Home></Home>
    },
    {
      path:'/allpolicies',
      element:<AllPolicies></AllPolicies>
    },
    {
      path:'/blogs',
      element:<Blogs></Blogs>
    },
    {
      path:'/blogDetails/:blogId',
      element:<BlogDetails></BlogDetails>
    },
    {
      path:'/policies-details/:id',
      element:<PoliciesDetails></PoliciesDetails>
    },
    {
      path:'/application-form/:policyId',
      element:<PrivateRoute><ApplicationForm></ApplicationForm></PrivateRoute>
    },
    {
      path:'/application-details/:applicationId',
      element:<ApplicationDetails></ApplicationDetails>
    },
    {
      path:'/get-quote/:id',
      element:<PrivateRoute><QuotePage></QuotePage></PrivateRoute>
    },
    {
      path:'/forbiden',
      element:<ForbiddenPage></ForbiddenPage>
    },
     {path:'/login',
      element:<Login></Login>
    },
     {path:'/register',
      element:<Register></Register>
    },
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
{
  index:true,
  element:<ProfilePage></ProfilePage>
},
{
  path:'manage-applications',
  element:<AdmineRoute><ManageApplications></ManageApplications></AdmineRoute>

},
{
  path:'manage-user',
  element:<AdmineRoute><ManageUsers></ManageUsers></AdmineRoute>
},
{
  path:'manage-policies',
  element:<AdmineRoute><ManagePolicies></ManagePolicies></AdmineRoute>

},
{
  path:'manage-transactions',
  element:<AdmineRoute><ManageTransactions></ManageTransactions></AdmineRoute>
},
{
  path:'assigned-cuntomer',
  element:<AgentRoute><AssignedCustomers></AssignedCustomers></AgentRoute>
},
{
  path:'manage-blogs',
  element:<AdminAndAgentRoute><ManageBlogs></ManageBlogs></AdminAndAgentRoute>
},
{
  path:'policy-clearance',
  element:<AgentRoute><PolicyClearance></PolicyClearance></AgentRoute>
},
{
  path:'my-policies',
  element:<CustomerRoute><MyPolicies></MyPolicies></CustomerRoute>
},
{
  path:'payment-status',
  element:<CustomerRoute><PaymentStatus></PaymentStatus></CustomerRoute>
},

{
  path:'payment/:policyId',
  element:<CustomerRoute><Payment></Payment></CustomerRoute>
},
{
  path:'claim-request',
  element:<CustomerRoute><ClaimRequest></ClaimRequest></CustomerRoute>
},
{
  path:'profile-page',
  element:<ProfilePage></ProfilePage>
},
{
  path:'rejected-applications',
  element:<CustomerRoute><RejectedApplications></RejectedApplications></CustomerRoute>
},

    ]
  }
]);