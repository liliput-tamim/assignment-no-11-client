import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ManageLoans = () => {
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, [user]);

  const fetchLoans = () => {
    fetch(`http://localhost:4000/loans`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch loans');
        }
        return res.json();
      })
      .then(data => setLoans(data))
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error("Failed to load loans");
      });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this loan?")) {
      fetch(`http://localhost:4000/loans/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to delete loan');
          }
          return res.json();
        })
        .then(() => {
          toast.success("Loan deleted successfully!");
          fetchLoans();
        })
        .catch(error => {
          console.error('Delete error:', error);
          toast.error("Failed to delete loan. Please try again.");
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedLoan = {
      title: editLoan.title?.trim(),
      description: editLoan.description?.trim(),
      interestRate: parseFloat(editLoan.interestRate),
      category: editLoan.category?.trim(),
      maxLoan: parseFloat(editLoan.maxLoan),
      image: editLoan.image?.trim()
    };
    
    // Validate required fields
    if (!updatedLoan.title || !updatedLoan.description || !updatedLoan.category || !updatedLoan.image) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (isNaN(updatedLoan.interestRate) || isNaN(updatedLoan.maxLoan)) {
      toast.error("Interest rate and max loan must be valid numbers");
      return;
    }
    
    console.log('Updating loan:', updatedLoan);
    
    fetch(`http://localhost:4000/loans/${editLoan._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLoan)
    })
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          return res.json().then(errorData => {
            throw new Error(errorData.error || 'Update failed');
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log('Update successful:', data);
        toast.success("Loan updated successfully!");
        setEditLoan(null);
        fetchLoans();
      })
      .catch(error => {
        console.error('Update error:', error);
        toast.error(`Update failed: ${error.message}`);
      });
  };

  const filteredLoans = loans.filter(loan => 
    loan.title?.toLowerCase().includes(search.toLowerCase()) ||
    loan.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Loans</h1>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search by title or category..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map(loan => (
              <tr key={loan._id}>
                <td><img src={loan.image} alt={loan.title} className="w-16 h-16 object-cover rounded" /></td>
                <td>{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>
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
                <input 
                  type="url" 
                  value={editLoan.image || ''} 
                  onChange={(e) => setEditLoan({...editLoan, image: e.target.value})} 
                  className="input input-bordered" 
                  placeholder="https://example.com/image.jpg"
                  required 
                />
                {editLoan.image && (
                  <div className="mt-2">
                    <img src={editLoan.image} alt="Preview" className="w-20 h-20 object-cover rounded" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
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

export default ManageLoans;
