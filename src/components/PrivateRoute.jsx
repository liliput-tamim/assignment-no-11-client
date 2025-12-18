import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Check for saved user data in localStorage as backup
  const savedUser = localStorage.getItem('loanlink_user');
  const authToken = document.cookie.includes('authToken');

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  // Allow access if user exists OR if there's saved user data with valid token
  if (!user && !savedUser && !authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
