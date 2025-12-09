import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/users/${user.email}`)
        .then(res => res.json())
        .then(data => setUserRole(data?.role));
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userRole === "manager" && (
          <>
            <Link to="/dashboard/manage-users" className="card bg-primary text-white shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title">Manage Users</h2>
                <p>Manage user roles and permissions</p>
              </div>
            </Link>
            <Link to="/dashboard/all-loans" className="card bg-secondary text-white shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title">All Loans</h2>
                <p>Manage all loan listings</p>
              </div>
            </Link>
            <Link to="/dashboard/loan-applications" className="card bg-accent text-white shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title">Loan Applications</h2>
                <p>View and manage applications</p>
              </div>
            </Link>
          </>
        )}
        {userRole === "borrower" && (
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">My Loans</h2>
              <p>View your loan applications</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
