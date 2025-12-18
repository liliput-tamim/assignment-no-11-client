import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import AllLoans from "../pages/AllLoans";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import LoanDetails from "../pages/LoanDetails";
import LoanApplication from "../pages/LoanApplication";
import PrivateRoute from "../components/PrivateRoute";
import ManageUsers from "../pages/dashboard/ManageUsers";
import AllLoansAdmin from "../pages/dashboard/AllLoansAdmin";
import LoanApplicationsAdmin from "../pages/dashboard/LoanApplicationsAdmin";
import AddLoan from "../pages/dashboard/AddLoan";
import ManageLoans from "../pages/dashboard/ManageLoans";
import PendingApplications from "../pages/dashboard/PendingApplications";
import ApprovedApplications from "../pages/dashboard/ApprovedApplications";
import MyProfile from "../pages/dashboard/MyProfile";
import MyLoans from "../pages/dashboard/MyLoans";
import Profile from "../pages/dashboard/Profile";
import PaymentSuccess from "../pages/PaymentSuccess";
import AdminRoute from "../components/AdminRoute";
import ManagerRoute from "../components/ManagerRoute";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-loans",
        element: <AllLoans />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/loan/:id",
        element: <PrivateRoute><LoanDetails /></PrivateRoute>,
      },
      {
        path: "/apply",
        element: <PrivateRoute><LoanApplication /></PrivateRoute>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "/dashboard/all-loans",
        element: <AdminRoute><AllLoansAdmin /></AdminRoute>,
      },
      {
        path: "/dashboard/loan-applications",
        element: <AdminRoute><LoanApplicationsAdmin /></AdminRoute>,
      },
      {
        path: "/dashboard/add-loan",
        element: <ManagerRoute><AddLoan /></ManagerRoute>,
      },
      {
        path: "/dashboard/manage-loans",
        element: <ManagerRoute><ManageLoans /></ManagerRoute>,
      },
      {
        path: "/dashboard/pending-applications",
        element: <ManagerRoute><PendingApplications /></ManagerRoute>,
      },
      {
        path: "/dashboard/approved-applications",
        element: <ManagerRoute><ApprovedApplications /></ManagerRoute>,
      },
      {
        path: "/dashboard/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/my-loans",
        element: <MyLoans />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
