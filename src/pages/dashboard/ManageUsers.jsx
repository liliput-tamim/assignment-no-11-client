import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [suspendModal, setSuspendModal] = useState({ show: false, user: null });
  const [suspendData, setSuspendData] = useState({ reason: "", feedback: "" });

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      });
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(user => 
        statusFilter === 'active' ? user.status !== 'suspended' : user.status === 'suspended'
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleUpdateRole = (email, newRole) => {
    fetch(`http://localhost:4000/users/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole })
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Role updated successfully!");
        const updatedUsers = users.map(u => u.email === email ? { ...u, role: newRole } : u);
        setUsers(updatedUsers);
      });
  };

  const openSuspendModal = (user) => {
    setSuspendModal({ show: true, user });
    setSuspendData({ reason: "", feedback: "" });
  };

  const handleSuspend = () => {
    if (!suspendData.reason.trim()) {
      toast.error("Please provide a reason for suspension");
      return;
    }
    
    fetch(`http://localhost:4000/users/${suspendModal.user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        status: "suspended",
        suspendReason: suspendData.reason,
        suspendFeedback: suspendData.feedback,
        suspendedAt: new Date().toISOString()
      })
    })
      .then(res => res.json())
      .then(() => {
        toast.success("User suspended successfully!");
        const updatedUsers = users.map(u => u.email === suspendModal.user.email ? { 
          ...u, 
          status: "suspended",
          suspendReason: suspendData.reason,
          suspendFeedback: suspendData.feedback
        } : u);
        setUsers(updatedUsers);
        setSuspendModal({ show: false, user: null });
      })
      .catch(() => toast.error("Failed to suspend user"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      
      {/* Search and Filter Controls */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Search Users</span></label>
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered input-sm"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Filter by Role</span></label>
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="borrower">Borrower</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Filter by Status</span></label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Results</span></label>
              <div className="flex items-center h-8">
                <span className="text-sm font-medium">{filteredUsers.length} users found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
            {filteredUsers.map(user => (
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
                    onClick={() => openSuspendModal(user)}
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

      {/* Suspend Modal */}
      {suspendModal.show && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Suspend User: {suspendModal.user?.name}</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Reason for Suspension *</span></label>
                <select 
                  value={suspendData.reason} 
                  onChange={(e) => setSuspendData({...suspendData, reason: e.target.value})}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="Violation of Terms">Violation of Terms</option>
                  <option value="Fraudulent Activity">Fraudulent Activity</option>
                  <option value="Payment Default">Payment Default</option>
                  <option value="Suspicious Behavior">Suspicious Behavior</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Additional Feedback</span></label>
                <textarea 
                  value={suspendData.feedback} 
                  onChange={(e) => setSuspendData({...suspendData, feedback: e.target.value})}
                  className="textarea textarea-bordered" 
                  rows="3"
                  placeholder="Provide additional details about the suspension..."
                ></textarea>
              </div>
            </div>
            <div className="modal-action">
              <button onClick={handleSuspend} className="btn btn-error">Suspend User</button>
              <button onClick={() => setSuspendModal({ show: false, user: null })} className="btn">Cancel</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageUsers;
