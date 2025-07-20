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
import AssignedCustomers from "../pages/customerDashboard/assignedCustomers/AssignedCustomers";
import ProfilePage from "../pages/shared/profilePage/ProfilePage";
import PaymentStatus from "../pages/customerDashboard/paymentStatus/PaymentStatus";
import MakePayment from "../pages/customerDashboard/paymentStatus/MakePayment";

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
      element:<ApplicationForm></ApplicationForm>
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
// {
//   index:true,
//   element:
// },
{
  path:'manage-policies',
  element:<ManagePolicies></ManagePolicies>

},
{
  path:'manage-applications',
  element:<ManageApplications></ManageApplications>

},
{
  path:'my-policies',
  element:<MyPolicies></MyPolicies>
},
{
  path:'manage-blogs',
  element:<ManageBlogs></ManageBlogs>
},
{
  path:'manage-user',
  element:<ManageUsers></ManageUsers>
},
{
  path:'assigned-cuntomer',
  element:<AssignedCustomers></AssignedCustomers>
},
{
  path:'profile-page',
  element:<ProfilePage></ProfilePage>
},
{
  path:'payment-status',
  element:<PaymentStatus></PaymentStatus>
},
{
  path:'make-payment',
  element:<MakePayment ></MakePayment >
},

    ]
  }
]);