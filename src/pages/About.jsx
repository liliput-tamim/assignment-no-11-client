import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="heading-primary text-center mb-8">About LoanLink</h1>
        
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="heading-secondary">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              LoanLink is dedicated to revolutionizing the microloan industry by providing a seamless, 
              transparent, and efficient platform for loan management. We bridge the gap between borrowers 
              and lenders, making financial assistance accessible to everyone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card card-equal bg-gradient-to-br from-primary to-primary-focus text-white shadow-xl"
          >
            <div className="card-body">
              <h3 className="heading-tertiary">Our Vision</h3>
              <p>To become the leading microloan platform, empowering entrepreneurs and small businesses worldwide.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card card-equal bg-gradient-to-br from-secondary to-secondary-focus text-white shadow-xl"
          >
            <div className="card-body">
              <h3 className="heading-tertiary">Our Values</h3>
              <p>Transparency, Trust, Innovation, and Customer-Centricity drive everything we do.</p>
            </div>
          </motion.div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="heading-secondary">Why Choose Us?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>Fast and secure loan processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>Competitive interest rates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span>Flexible repayment options</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
