import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
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
        path: "/dashboard",
        element: <Dashboard />,
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
        path: "/dashboard/manage-users",
        element: <PrivateRoute><ManageUsers /></PrivateRoute>,
      },
      {
        path: "/dashboard/all-loans",
        element: <PrivateRoute><AllLoansAdmin /></PrivateRoute>,
      },
      {
        path: "/dashboard/loan-applications",
        element: <PrivateRoute><LoanApplicationsAdmin /></PrivateRoute>,
      },
    ],
  },
]);
