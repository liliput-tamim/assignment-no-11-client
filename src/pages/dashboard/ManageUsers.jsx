import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleUpdateRole = (email, newRole) => {
    fetch(`http://localhost:4000/users/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole })
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Role updated successfully!");
        setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
      });
  };

  const handleSuspend = (email) => {
    fetch(`http://localhost:4000/users/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "suspended" })
    })
      .then(res => res.json())
      .then(() => {
        toast.success("User suspended!");
        setUsers(users.map(u => u.email === email ? { ...u, status: "suspended" } : u));
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleUpdateRole(user.email, e.target.value)}
                    className="select select-bordered select-sm"
                  >
                    <option value="borrower">Borrower</option>
                    <option value="manager">Manager</option>
                  </select>
                </td>
                <td>
                  <span className={`badge ${user.status === "suspended" ? "badge-error" : "badge-success"}`}>
                    {user.status || "active"}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleSuspend(user.email)}
                    className="btn btn-sm btn-warning"
                    disabled={user.status === "suspended"}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
