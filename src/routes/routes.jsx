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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
     {index:true,
      element:<Home></Home>
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
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>
  }
]);