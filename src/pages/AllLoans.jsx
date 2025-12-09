import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/loans")
      .then(res => res.json())
      .then(data => setLoans(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Loans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan, index) => (
          <motion.div
            key={loan._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card card-equal bg-base-100 shadow-xl hover:shadow-2xl transition-smooth hover:-translate-y-2"
          >
            <figure><img src={loan.image} alt={loan.title} className="img-standard" /></figure>
            <div className="card-body">
              <h2 className="card-title">{loan.title}</h2>
              <p className="text-sm"><span className="font-semibold">Category:</span> {loan.category}</p>
              <p className="text-sm"><span className="font-semibold">Interest:</span> {loan.interestRate}%</p>
              <p className="text-sm"><span className="font-semibold">Max Loan:</span> ${loan.maxLoan}</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/loan/${loan._id}`} className="btn btn-primary btn-sm shadow-md hover:shadow-lg transition-smooth">View Details</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllLoans;
