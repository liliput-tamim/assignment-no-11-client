import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const { user, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-loans">All-Loans</NavLink></li>
      {!user && (
        <>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </>
      )}
      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-smooth">LoanLink</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle hover:rotate-180 transition-all duration-500">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user ? (
          <>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://via.placeholder.com/40"} alt="User" />
              </div>
            </div>
            <button onClick={() => {
              logoutUser().then(() => toast.success("Logged out successfully!"));
            }} className="btn btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline btn-primary">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary shadow-lg hover:shadow-xl transition-smooth">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
