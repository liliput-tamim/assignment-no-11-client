import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="heading-primary text-center mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="heading-secondary">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Name</span></label>
                    <input type="text" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Email</span></label>
                    <input type="email" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Subject</span></label>
                    <input type="text" className="input input-bordered" required />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Message</span></label>
                    <textarea className="textarea textarea-bordered" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full shadow-lg hover:shadow-xl transition-smooth">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card card-equal bg-gradient-to-br from-primary to-primary-focus text-white shadow-xl">
              <div className="card-body">
                <h3 className="heading-tertiary">📍 Address</h3>
                <p>123 Finance Street, New York, NY 10001</p>
              </div>
            </div>

            <div className="card card-equal bg-gradient-to-br from-secondary to-secondary-focus text-white shadow-xl">
              <div className="card-body">
                <h3 className="heading-tertiary">📧 Email</h3>
                <p>info@loanlink.com</p>
                <p>support@loanlink.com</p>
              </div>
            </div>

            <div className="card card-equal bg-gradient-to-br from-accent to-accent-focus text-white shadow-xl">
              <div className="card-body">
                <h3 className="heading-tertiary">📞 Phone</h3>
                <p>+1 (234) 567-890</p>
                <p>+1 (234) 567-891</p>
              </div>
            </div>

            <div className="card card-equal bg-gradient-to-br from-success to-success-focus text-white shadow-xl">
              <div className="card-body">
                <h3 className="heading-tertiary">🕒 Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
