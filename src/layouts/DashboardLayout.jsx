import { useContext, useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/users/${user.email}`)
        .then(res => res.json())
        .then(data => setUserRole(data?.role));
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser().then(() => {
      toast.success("Logged out successfully!");
      navigate("/");
    });
  };

  const managerLinks = [
    { to: "/dashboard", icon: "🏠", label: "Dashboard" },
    { to: "/dashboard/add-loan", icon: "➕", label: "Add Loan" },
    { to: "/dashboard/manage-loans", icon: "📋", label: "Manage Loans" },
    { to: "/dashboard/pending-applications", icon: "⏳", label: "Pending Applications" },
    { to: "/dashboard/approved-applications", icon: "✅", label: "Approved Applications" },
    { to: "/dashboard/profile", icon: "👤", label: "My Profile" },
  ];

  const borrowerLinks = [
    { to: "/dashboard", icon: "🏠", label: "Dashboard" },
    { to: "/dashboard/my-loans", icon: "💰", label: "My Loans" },
    { to: "/dashboard/profile", icon: "👤", label: "My Profile" },
  ];

  const links = userRole === "manager" ? managerLinks : borrowerLinks;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-base-100 shadow-lg sticky top-0 z-50">
        <div className="navbar px-4">
          <div className="navbar-start">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LoanLink
            </Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <span className="text-lg font-semibold">Dashboard</span>
          </div>
          
          <div className="navbar-end gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://via.placeholder.com/40"} alt="Profile" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/dashboard/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 bg-base-100 shadow-lg min-h-screen transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-40`}>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-6 p-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL || "https://via.placeholder.com/48"} alt="Profile" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{user?.displayName}</p>
                <p className="text-xs opacity-90">{userRole?.toUpperCase()}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-base-100 border-t border-base-300 py-4 text-center">
        <p className="text-sm text-base-content/70">© {new Date().getFullYear()} LoanLink Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;