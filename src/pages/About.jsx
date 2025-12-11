const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About LoanLink
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering financial inclusion through innovative microloan management solutions
            </p>
          </div>

          {/* Mission Card */}
          <div className="card bg-white shadow-2xl mb-12 hover:shadow-3xl transition-all duration-300" style={{ borderRadius: '16px' }}>
            <div className="card-body p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-700">
                LoanLink is a comprehensive web-based microloan request, review & approval management system designed to streamline financial operations for small financial organizations, NGOs, and microloan providers.
              </p>
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ borderRadius: '16px' }}>
              <div className="card-body p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">The Problem We Solve</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Many small financial organizations struggle to maintain loan applications, verification, approvals, EMI schedules, and repayments in one unified system.
                </p>
              </div>
            </div>
            
            <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ borderRadius: '16px' }}>
              <div className="card-body p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-500 text-xl">💡</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Our Solution</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  LoanLink provides an all-in-one platform that simplifies loan management, from application to repayment, making microfinance accessible and efficient.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="card bg-white shadow-2xl" style={{ borderRadius: '16px' }}>
            <div className="card-body p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Key Features</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: '📝', title: 'Loan Application', desc: 'Management' },
                  { icon: '🔍', title: 'Review &', desc: 'Verification' },
                  { icon: '✅', title: 'Approval', desc: 'Workflow' },
                  { icon: '👥', title: 'User', desc: 'Management' },
                  { icon: '📊', title: 'EMI Schedule', desc: 'Generation' },
                  { icon: '💰', title: 'Repayment', desc: 'Tracking' },
                  { icon: '📈', title: 'Dashboard', desc: 'Analytics' },
                  { icon: '🔒', title: 'Secure &', desc: 'Scalable' }
                ].map((feature, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { number: '1000+', label: 'Loans Processed' },
              { number: '50+', label: 'Partner Organizations' },
              { number: '99.9%', label: 'Uptime Guarantee' }
            ].map((stat, index) => (
              <div key={index} className="card bg-white shadow-xl text-center hover:shadow-2xl transition-all duration-300" style={{ borderRadius: '16px' }}>
                <div className="card-body p-6">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.number}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
