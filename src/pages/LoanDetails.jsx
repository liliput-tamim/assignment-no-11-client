import { useParams, Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const LoanDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loan, setLoan] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/loans/${id}`)
      .then(res => res.json())
      .then(data => {
        setLoan(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/users/${user.email}`)
        .then(res => res.json())
        .then(data => setUserRole(data?.role));
    }
  }, [user]);

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;

  const canApply = user && userRole !== "manager";

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <img src={loan.image} alt={loan.title} className="w-full h-96 object-cover rounded-lg shadow-xl" />
        <h1 className="text-4xl font-bold mt-6">{loan.title}</h1>
        <p className="text-xl mt-4 text-gray-600">{loan.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="card bg-base-200 shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Loan Information</h3>
            <p className="mb-2"><span className="font-semibold">Category:</span> {loan.category}</p>
            <p className="mb-2"><span className="font-semibold">Interest Rate:</span> {loan.interestRate}%</p>
            <p className="mb-2"><span className="font-semibold">Max Limit:</span> ${loan.maxLoan}</p>
            <p className="mb-2"><span className="font-semibold">Duration:</span> {loan.duration} months</p>
          </div>
          
          <div className="card bg-base-200 shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Available EMI Plans</h3>
            {Array.isArray(loan.emiPlans) && loan.emiPlans.length > 0 ? (
              loan.emiPlans.map((plan, index) => (
                <p key={index} className="mb-2">
                  <span className="font-semibold">{plan.months} months:</span> ${plan.monthlyPayment}/month
                </p>
              ))
            ) : (
              <>
                <p className="mb-2"><span className="font-semibold">6 months:</span> ${(loan.maxLoan * (1 + loan.interestRate / 100) / 6).toFixed(2)}/month</p>
                <p className="mb-2"><span className="font-semibold">12 months:</span> ${(loan.maxLoan * (1 + loan.interestRate / 100) / 12).toFixed(2)}/month</p>
                <p className="mb-2"><span className="font-semibold">24 months:</span> ${(loan.maxLoan * (1 + loan.interestRate / 100) / 24).toFixed(2)}/month</p>
              </>
            )}
          </div>
        </div>

        {canApply ? (
          <Link to="/apply" state={{ loan }} className="btn btn-primary btn-lg mt-8 w-full md:w-auto">
            Apply Now
          </Link>
        ) : (
          <button disabled className="btn btn-disabled btn-lg mt-8 w-full md:w-auto">
            {!user ? "Login to Apply" : "Not Available for Managers"}
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default LoanDetails;
