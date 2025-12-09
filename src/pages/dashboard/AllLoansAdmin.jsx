import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllLoansAdmin = () => {
  const [loans, setLoans] = useState([]);
  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = () => {
    fetch("http://localhost:4000/loans")
      .then(res => res.json())
      .then(data => setLoans(data));
  };

  const handleToggleHome = (id, currentStatus) => {
    fetch(`http://localhost:4000/loans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showOnHome: !currentStatus })
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Updated!");
        fetchLoans();
      });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this loan?")) {
      fetch(`http://localhost:4000/loans/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => {
          toast.success("Loan deleted!");
          fetchLoans();
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/loans/${editLoan._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editLoan)
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Loan updated!");
        setEditLoan(null);
        fetchLoans();
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Loans</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan._id}>
                <td><img src={loan.image} alt={loan.title} className="w-16 h-16 object-cover rounded" /></td>
                <td>{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>
                <td>
                  <input 
                    type="checkbox" 
                    checked={loan.showOnHome || false}
                    onChange={() => handleToggleHome(loan._id, loan.showOnHome)}
                    className="checkbox checkbox-primary"
                  />
                </td>
                <td className="space-x-2">
                  <button onClick={() => setEditLoan(loan)} className="btn btn-sm btn-info">Update</button>
                  <button onClick={() => handleDelete(loan._id)} className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editLoan && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Update Loan</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Title</span></label>
                <input type="text" value={editLoan.title} onChange={(e) => setEditLoan({...editLoan, title: e.target.value})} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Description</span></label>
                <textarea value={editLoan.description} onChange={(e) => setEditLoan({...editLoan, description: e.target.value})} className="textarea textarea-bordered" required></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Interest Rate</span></label>
                  <input type="number" value={editLoan.interestRate} onChange={(e) => setEditLoan({...editLoan, interestRate: e.target.value})} className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Category</span></label>
                  <input type="text" value={editLoan.category} onChange={(e) => setEditLoan({...editLoan, category: e.target.value})} className="input input-bordered" required />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Max Loan</span></label>
                <input type="number" value={editLoan.maxLoan} onChange={(e) => setEditLoan({...editLoan, maxLoan: e.target.value})} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Image URL</span></label>
                <input type="url" value={editLoan.image} onChange={(e) => setEditLoan({...editLoan, image: e.target.value})} className="input input-bordered" required />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={() => setEditLoan(null)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllLoansAdmin;
