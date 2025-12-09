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
    loanAmount: "",
    purpose: "",
    duration: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const application = {
      ...formData,
      loanId: loan?._id,
      loanTitle: loan?.title,
      userEmail: user.email,
      userName: user.displayName,
      status: "pending",
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
          {loan && (
            <div className="alert alert-info mb-4">
              <span>Applying for: {loan.title}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                className="input input-bordered"
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="input input-bordered"
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Loan Amount</span>
              </label>
              <input
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                className="input input-bordered"
                max={loan?.maxLoan}
                required
              />
              {loan && <label className="label"><span className="label-text-alt">Max: ${loan.maxLoan}</span></label>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration (months)</span>
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="select select-bordered"
                required
              >
                <option value="">Select duration</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Purpose</span>
              </label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="textarea textarea-bordered"
                rows="4"
                required
              ></textarea>
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
