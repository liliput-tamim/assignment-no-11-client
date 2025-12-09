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
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Register", desc: "Create your account" },
              { step: "2", title: "Apply", desc: "Fill loan application" },
              { step: "3", title: "Review", desc: "We verify your details" },
              { step: "4", title: "Receive", desc: "Get funds approved" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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
