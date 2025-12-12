import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const [loans, setLoans] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: "Sarah Johnson", text: "LoanLink helped me start my small business. The process was quick and transparent!", rating: 5 },
    { name: "Michael Chen", text: "Best microloan platform I've used. Highly recommend for entrepreneurs.", rating: 5 },
    { name: "Emily Davis", text: "Simple application process and fast approval. Thank you LoanLink!", rating: 5 },
  ];

  useEffect(() => {
    fetch("http://localhost:4000/loans?limit=6")
      .then(res => res.json())
      .then(data => setLoans(data));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="hero min-h-[600px] bg-gradient-to-r from-primary to-secondary"
      >
        <div className="hero-content text-center text-white">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ y: -50 }} 
              animate={{ y: 0 }} 
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-6"
            >
              Empower Your Dreams with LoanLink
            </motion.h1>
            <motion.p 
              initial={{ y: 50 }} 
              animate={{ y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Fast, transparent, and reliable microloan solutions for entrepreneurs and small businesses
            </motion.p>
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-x-4"
            >
              <Link to="/apply" className="btn btn-lg bg-white text-primary hover:bg-gray-100">Apply for Loan</Link>
              <Link to="/all-loans" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary">Explore Loans</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Available Loans */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Available Loan Options
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan, index) => (
            <motion.div
              key={loan._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <figure><img src={loan.image} alt={loan.title} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h3 className="card-title">{loan.title}</h3>
                <p>{loan.description?.substring(0, 80)}...</p>
                <p className="font-semibold text-primary">Max Loan: ${loan.maxLoan}</p>
                <div className="card-actions justify-end">
                  <Link to={`/loan/${loan._id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Your Journey to Financial Freedom
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our streamlined process designed to get you the funds you need, when you need them
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { 
                  step: "01", 
                  icon: "🚀", 
                  title: "Quick Registration", 
                  desc: "Sign up in under 2 minutes with just your email and basic info",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50"
                },
                { 
                  step: "02", 
                  icon: "📋", 
                  title: "Smart Application", 
                  desc: "Our AI-powered form adapts to your needs for faster completion",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-50 to-pink-50"
                },
                { 
                  step: "03", 
                  icon: "⚡", 
                  title: "Instant Verification", 
                  desc: "Advanced algorithms verify your details in real-time for quick decisions",
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-50 to-red-50"
                },
                { 
                  step: "04", 
                  icon: "💰", 
                  title: "Secure Transfer", 
                  desc: "Funds deposited directly to your account within 24 hours of approval",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-50 to-emerald-50"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative bg-gradient-to-br ${item.bgColor} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50`}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gray-100">
                    <span className="text-sm font-bold text-gray-700">{item.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mt-6 flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i <= index ? `bg-gradient-to-r ${item.color}` : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">Join over 10,000+ satisfied customers who trust LoanLink for their financial needs</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  🚀 Start Your Application
                </Link>
                <Link to="/all-loans" className="btn btn-outline btn-lg hover:shadow-lg transition-all duration-300">
                  📋 Browse Loan Options
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Feedback Carousel */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          What Our Customers Say
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="card bg-base-100 shadow-xl p-8 text-center"
          >
            <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <p className="text-xl italic mb-4">"{testimonials[currentTestimonial].text}"</p>
            <p className="font-semibold">- {testimonials[currentTestimonial].name}</p>
          </motion.div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Why Choose LoanLink?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Fast Approval", desc: "Get approved within 24 hours" },
              { icon: "🔒", title: "Secure & Safe", desc: "Bank-level security for your data" },
              { icon: "💰", title: "Low Interest", desc: "Competitive rates for everyone" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card bg-base-100 shadow-lg p-6 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8"
          >
            Join thousands of satisfied customers who trust LoanLink
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/apply" className="btn btn-lg bg-white text-primary hover:bg-gray-100">Apply Now</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
