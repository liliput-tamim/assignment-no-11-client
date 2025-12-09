import { useEffect, useState } from "react";

const ApprovedApplications = () => {
  const [applications, setApplications] = useState([]);
  const [viewApp, setViewApp] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/applications?status=approved")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Approved Applications</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Loan Title</th>
              <th>Amount</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>
                  <div>{app.firstName} {app.lastName}</div>
                  <div className="text-sm text-gray-500">{app.userEmail}</div>
                </td>
                <td>{app.loanTitle}</td>
                <td>${app.loanAmount}</td>
                <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => setViewApp(app)} className="btn btn-sm btn-info">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewApp && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Application Details</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Name:</span> {viewApp.firstName} {viewApp.lastName}</p>
              <p><span className="font-semibold">Email:</span> {viewApp.userEmail}</p>
              <p><span className="font-semibold">Contact:</span> {viewApp.contactNumber}</p>
              <p><span className="font-semibold">National ID:</span> {viewApp.nationalId}</p>
              <p><span className="font-semibold">Loan Title:</span> {viewApp.loanTitle}</p>
              <p><span className="font-semibold">Interest Rate:</span> {viewApp.interestRate}%</p>
              <p><span className="font-semibold">Loan Amount:</span> ${viewApp.loanAmount}</p>
              <p><span className="font-semibold">Income Source:</span> {viewApp.incomeSource}</p>
              <p><span className="font-semibold">Monthly Income:</span> ${viewApp.monthlyIncome}</p>
              <p><span className="font-semibold">Reason:</span> {viewApp.reason}</p>
              <p><span className="font-semibold">Address:</span> {viewApp.address}</p>
              <p><span className="font-semibold">Status:</span> <span className="badge badge-success">Approved</span></p>
            </div>
            <div className="modal-action">
              <button onClick={() => setViewApp(null)} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApprovedApplications;
