import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AddLoan = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    interestRate: "",
    maxLoan: "",
    requiredDocuments: "",
    emiPlans: "",
    image: "",
    showOnHome: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const loanData = {
      ...formData,
      createdBy: user.email,
      createdDate: new Date().toISOString(),
      interestRate: parseFloat(formData.interestRate),
      maxLoan: parseFloat(formData.maxLoan),
    };

    fetch("http://localhost:4000/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loanData),
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Loan added successfully!");
        navigate("/dashboard/manage-loans");
      })
      .catch(() => toast.error("Failed to add loan"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Loan</h1>
      <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Loan Title</span></label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Description</span></label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="textarea textarea-bordered" rows="4" required></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Category</span></label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Interest Rate (%)</span></label>
                <input type="number" step="0.01" value={formData.interestRate} onChange={(e) => setFormData({...formData, interestRate: e.target.value})} className="input input-bordered" required />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Max Loan Limit</span></label>
              <input type="number" value={formData.maxLoan} onChange={(e) => setFormData({...formData, maxLoan: e.target.value})} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Required Documents</span></label>
              <input type="text" value={formData.requiredDocuments} onChange={(e) => setFormData({...formData, requiredDocuments: e.target.value})} className="input input-bordered" placeholder="e.g., ID, Proof of Income" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">EMI Plans</span></label>
              <input type="text" value={formData.emiPlans} onChange={(e) => setFormData({...formData, emiPlans: e.target.value})} className="input input-bordered" placeholder="e.g., 6, 12, 24 months" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Image URL</span></label>
              <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Show on Home Page</span>
                <input type="checkbox" checked={formData.showOnHome} onChange={(e) => setFormData({...formData, showOnHome: e.target.checked})} className="checkbox checkbox-primary" />
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-full">Add Loan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLoan;
