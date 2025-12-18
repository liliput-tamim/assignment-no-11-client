import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserRole(data?.role);
          setRoleLoading(false);
        })
        .catch(() => setRoleLoading(false));
    } else {
      setRoleLoading(false);
    }
  }, [user]);

  if (loading || roleLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userRole !== "manager") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ManagerRoute;