import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import PaymentModal from "../../components/PaymentModal";

const MyLoans = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [viewApp, setViewApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentModal, setPaymentModal] = useState({ show: false, appId: null });

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/applications?userEmail=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setApplications(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this application?")) {
      fetch(`http://localhost:4000/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" })
      })
        .then(res => res.json())
        .then(() => {
          toast.success("Application cancelled!");
          setApplications(applications.filter(app => app._id !== id));
        });
    }
  };

  const openPaymentModal = (appId) => {
    setPaymentModal({ show: true, appId });
  };

  const closePaymentModal = () => {
    setPaymentModal({ show: false, appId: null });
    // Refresh applications to get updated payment status
    fetch(`http://localhost:4000/applications?userEmail=${user.email}`)
      .then(res => res.json())
      .then(data => setApplications(data));
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Loans</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app._id?.substring(0, 8)}...</td>
                <td>
                  <div className="font-semibold">{app.loanTitle}</div>
                  <div className="text-sm text-gray-500">Interest: {app.interestRate}%</div>
                </td>
                <td>${app.loanAmount}</td>
                <td>
                  <span className={`badge ${
                    app.status === "approved" ? "badge-success" : 
                    app.status === "rejected" ? "badge-error" : 
                    app.status === "cancelled" ? "badge-neutral" : "badge-warning"
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button onClick={() => setViewApp(app)} className="btn btn-sm btn-info">View</button>
                  {app.status === "pending" && (
                    <button onClick={() => handleCancel(app._id)} className="btn btn-sm btn-error">Cancel</button>
                  )}
                  {app.applicationFeeStatus === "unpaid" ? (
                    <button onClick={() => openPaymentModal(app._id)} className="btn btn-sm btn-success">💳 Pay $10</button>
                  ) : (
                    <span className="badge badge-success">✅ Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewApp && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Loan Application Details</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Loan Title:</span> {viewApp.loanTitle}</p>
              <p><span className="font-semibold">Interest Rate:</span> {viewApp.interestRate}%</p>
              <p><span className="font-semibold">Loan Amount:</span> ${viewApp.loanAmount}</p>
              <p><span className="font-semibold">Status:</span> {viewApp.status}</p>
              <p><span className="font-semibold">Fee Status:</span> {viewApp.applicationFeeStatus}</p>
              <p><span className="font-semibold">Applied Date:</span> {new Date(viewApp.appliedDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Reason:</span> {viewApp.reason}</p>
            </div>
            <div className="modal-action">
              <button onClick={() => setViewApp(null)} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      )}

      <PaymentModal 
        isOpen={paymentModal.show}
        onClose={closePaymentModal}
        applicationId={paymentModal.appId}
        amount={10}
      />
    </div>
  );
};

export default MyLoans;
