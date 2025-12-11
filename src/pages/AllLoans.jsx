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
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {loans.map((loan, index) => (
          <motion.div
            key={loan._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{
              borderRadius: '12px',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <figure style={{ borderRadius: '12px 12px 0 0' }}>
              <img 
                src={loan.image} 
                alt={loan.title} 
                className="h-48 w-full object-cover" 
                style={{ borderRadius: '12px 12px 0 0' }}
              />
            </figure>
            <div className="card-body flex-grow" style={{ padding: '1.5rem' }}>
              <h2 className="card-title text-lg font-bold mb-3">{loan.title}</h2>
              <div className="space-y-2 flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Category:</span>
                  <span className="badge badge-outline">{loan.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Interest Rate:</span>
                  <span className="text-primary font-semibold">{loan.interestRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Max Loan:</span>
                  <span className="text-success font-semibold">${loan.maxLoan?.toLocaleString()}</span>
                </div>
              </div>
              <div className="card-actions justify-center mt-4">
                <Link 
                  to={`/loan/${loan._id}`} 
                  className="btn btn-primary btn-sm w-full"
                  style={{ borderRadius: '8px' }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllLoans;
