import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoanApplication = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const loan = location.state?.loan;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nationalId: "",
    incomeSource: "",
    monthlyIncome: "",
    loanAmount: "",
    reason: "",
    address: "",
    extraNotes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const application = {
      ...formData,
      userEmail: user.email,
      loanTitle: loan?.title || "General Loan",
      interestRate: loan?.interestRate || 0,
      loanId: loan?._id,
      status: "pending",
      applicationFeeStatus: "unpaid",
      appliedDate: new Date().toISOString(),
    };

    fetch("http://localhost:4000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Application submitted successfully!");
        navigate("/dashboard");
      })
      .catch(() => toast.error("Failed to submit application"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Loan Application Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">User Email</span></label>
              <input type="email" value={user?.email || ""} className="input input-bordered" disabled />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Loan Title</span></label>
              <input type="text" value={loan?.title || "General Loan"} className="input input-bordered" disabled />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Interest Rate</span></label>
              <input type="text" value={`${loan?.interestRate || 0}%`} className="input input-bordered" disabled />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">First Name</span></label>
                <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Last Name</span></label>
                <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="input input-bordered" required />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Contact Number</span></label>
              <input type="tel" value={formData.contactNumber} onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">National ID / Passport Number</span></label>
              <input type="text" value={formData.nationalId} onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })} className="input input-bordered" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Income Source</span></label>
                <input type="text" value={formData.incomeSource} onChange={(e) => setFormData({ ...formData, incomeSource: e.target.value })} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Monthly Income</span></label>
                <input type="number" value={formData.monthlyIncome} onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })} className="input input-bordered" required />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Loan Amount</span></label>
              <input type="number" value={formData.loanAmount} onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })} className="input input-bordered" max={loan?.maxLoan} required />
              {loan && <label className="label"><span className="label-text-alt">Max: ${loan.maxLoan}</span></label>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Reason for Loan</span></label>
              <textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} className="textarea textarea-bordered" rows="3" required></textarea>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Address</span></label>
              <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="textarea textarea-bordered" rows="2" required></textarea>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Extra Notes (Optional)</span></label>
              <textarea value={formData.extraNotes} onChange={(e) => setFormData({ ...formData, extraNotes: e.target.value })} className="textarea textarea-bordered" rows="2"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
