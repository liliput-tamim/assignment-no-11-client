const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About LoanLink</h1>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              LoanLink is a comprehensive web-based microloan request, review & approval management system designed to streamline financial operations for small financial organizations, NGOs, and microloan providers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">The Problem We Solve</h3>
              <p>
                Many small financial organizations struggle to maintain loan applications, verification, approvals, EMI schedules, and repayments in one unified system.
              </p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Our Solution</h3>
              <p>
                LoanLink provides an all-in-one platform that simplifies loan management, from application to repayment, making microfinance accessible and efficient.
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Loan Application Management</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Application Review & Verification</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Approval Workflow</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> User Management</li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> EMI Schedule Generation</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Repayment Tracking</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Dashboard Analytics</li>
                <li className="flex items-center"><span className="text-primary mr-2">✓</span> Secure & Scalable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
