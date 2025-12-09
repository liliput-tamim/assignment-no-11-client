import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ loans: 0, applications: 0, users: 0, approved: 0, pending: 0, rejected: 0 });

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserRole(data?.role);
          setLoading(false);
        });
      
      Promise.all([
        fetch('http://localhost:4000/loans').then(r => r.json()),
        fetch('http://localhost:4000/applications').then(r => r.json()),
        fetch('http://localhost:4000/users').then(r => r.json())
      ]).then(([loans, apps, users]) => {
        setStats({
          loans: loans.length,
          applications: apps.length,
          users: users.length,
          approved: apps.filter(a => a.status === 'approved').length,
          pending: apps.filter(a => a.status === 'pending').length,
          rejected: apps.filter(a => a.status === 'rejected').length
        });
      });
    }
  }, [user]);

  const statusData = [
    { name: 'Approved', value: stats.approved, color: '#10b981' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' }
  ];

  const monthlyData = [
    { month: 'Jan', applications: 12 },
    { month: 'Feb', applications: 19 },
    { month: 'Mar', applications: 15 },
    { month: 'Apr', applications: 25 },
    { month: 'May', applications: 22 },
    { month: 'Jun', applications: 30 }
  ];

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* User Profile Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName}!</h1>
              <p className="text-lg opacity-90">{user?.email}</p>
              <span className="badge badge-lg bg-white text-primary mt-2">{userRole?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="w-full px-4 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stat bg-base-100 shadow-xl rounded-lg">
              <div className="stat-figure text-primary">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-title">Total Loans</div>
              <div className="stat-value text-primary">{stats.loans}</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-lg">
              <div className="stat-figure text-secondary">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="stat-title">Applications</div>
              <div className="stat-value text-secondary">{stats.applications}</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-lg">
              <div className="stat-figure text-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-accent">{stats.users}</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-lg">
              <div className="stat-figure text-success">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-title">Approved</div>
              <div className="stat-value text-success">{stats.approved}</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Application Status Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={80} fill="#8884d8" dataKey="value">
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Monthly Applications Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRole === "manager" && (
              <>
                <Link to="/dashboard/add-loan" className="card card-equal bg-gradient-to-br from-primary to-primary-focus text-white shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2">
                  <div className="card-body">
                    <h2 className="card-title">Add Loan</h2>
                    <p>Create new loan listing</p>
                  </div>
                </Link>
                <Link to="/dashboard/manage-loans" className="card card-equal bg-gradient-to-br from-secondary to-secondary-focus text-white shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2">
                  <div className="card-body">
                    <h2 className="card-title">Manage Loans</h2>
                    <p>Edit and delete your loans</p>
                  </div>
                </Link>
                <Link to="/dashboard/pending-applications" className="card card-equal bg-gradient-to-br from-accent to-accent-focus text-white shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2">
                  <div className="card-body">
                    <h2 className="card-title">Pending Applications</h2>
                    <p>Review pending loan requests</p>
                  </div>
                </Link>
                <Link to="/dashboard/approved-applications" className="card card-equal bg-gradient-to-br from-success to-success-focus text-white shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2">
                  <div className="card-body">
                    <h2 className="card-title">Approved Applications</h2>
                    <p>View approved loans</p>
                  </div>
                </Link>
                <Link to="/dashboard/profile" className="card card-equal bg-gradient-to-br from-info to-info-focus text-white shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2">
                  <div className="card-body">
                    <h2 className="card-title">My Profile</h2>
                    <p>View your profile information</p>
                  </div>
                </Link>
              </>
            )}
            {userRole === "borrower" && (
              <>
                <Link to="/dashboard/my-loans" className="card card-equal bg-gradient-to-br from-primary to-primary-focus text-white shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2">
                  <div className="card-body">
                    <h2 className="card-title">My Loans</h2>
                    <p>View your loan applications</p>
                  </div>
                </Link>
                <Link to="/dashboard/profile" className="card card-equal bg-gradient-to-br from-secondary to-secondary-focus text-white shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2">
                  <div className="card-body">
                    <h2 className="card-title">My Profile</h2>
                    <p>View your profile information</p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
