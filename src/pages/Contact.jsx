import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Contact LoanLink
            </h1>
            <p className="text-xl text-gray-600">We're here to help with all your microloan needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card bg-white shadow-2xl" style={{ borderRadius: '16px' }}>
                <div className="card-body p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xl">📝</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Full Name *</span></label>
                        <input 
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})} 
                          className="input input-bordered" 
                          style={{ borderRadius: '8px' }}
                          required 
                        />
                      </div>
                      <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Phone Number *</span></label>
                        <input 
                          type="tel" 
                          value={formData.phone} 
                          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                          className="input input-bordered" 
                          style={{ borderRadius: '8px' }}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Email Address *</span></label>
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        className="input input-bordered" 
                        style={{ borderRadius: '8px' }}
                        required 
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Subject *</span></label>
                      <select 
                        value={formData.subject} 
                        onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                        className="select select-bordered" 
                        style={{ borderRadius: '8px' }}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="New Loan Inquiry">New Loan Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Repayment/EMI Query">Repayment/EMI Query</option>
                        <option value="Partnership Inquiry">Partnership Inquiry</option>
                        <option value="General Question">General Question</option>
                        <option value="Complaint/Feedback">Complaint/Feedback</option>
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Message *</span></label>
                      <textarea 
                        value={formData.message} 
                        onChange={(e) => setFormData({...formData, message: e.target.value})} 
                        className="textarea textarea-bordered" 
                        rows="5" 
                        style={{ borderRadius: '8px' }}
                        placeholder="Please describe your inquiry in detail..."
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary w-full text-lg"
                      style={{ borderRadius: '8px' }}
                    >
                      Send Message 📤
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Primary Contact */}
              <div className="card bg-white shadow-xl" style={{ borderRadius: '16px' }}>
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📞</span>
                    <h3 className="text-xl font-bold text-gray-800">Primary Contact</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">📧</span>
                      <div>
                        <p className="font-medium">General Inquiries</p>
                        <p className="text-sm text-gray-600">info@loanlink.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">🛠️</span>
                      <div>
                        <p className="font-medium">Customer Support</p>
                        <p className="text-sm text-gray-600">support@loanlink.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">📞</span>
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">🆘</span>
                      <div>
                        <p className="font-medium">Technical Support</p>
                        <p className="text-sm text-gray-600">+1 (555) 987-6543</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Address */}
              <div className="card bg-white shadow-xl" style={{ borderRadius: '16px' }}>
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📍</span>
                    <h3 className="text-xl font-bold text-gray-800">Office Address</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">LoanLink Financial Services</p>
                    <p className="text-gray-600">123 Finance Street, Suite 456</p>
                    <p className="text-gray-600">Business District, BD 12345</p>
                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                  </div>
                  <div className="mt-4">
                    <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">🗺️ Interactive Map</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="card bg-white shadow-xl" style={{ borderRadius: '16px' }}>
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🕒</span>
                    <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday:</span>
                      <span className="text-green-600">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span className="text-green-600">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span className="text-red-500">Closed</span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-50 rounded">
                      <p className="text-sm text-blue-700">📞 24/7 Emergency Support Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Support */}
              <div className="card bg-white shadow-xl" style={{ borderRadius: '16px' }}>
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">💬</span>
                    <h3 className="text-xl font-bold text-gray-800">Additional Support</h3>
                  </div>
                  <div className="space-y-3">
                    <button className="btn btn-outline btn-sm w-full" style={{ borderRadius: '8px' }}>
                      💬 Live Chat Support
                    </button>
                    <button className="btn btn-outline btn-sm w-full" style={{ borderRadius: '8px' }}>
                      ❓ FAQ / Help Center
                    </button>
                    <div className="flex space-x-2">
                      <button className="btn btn-outline btn-sm flex-1" style={{ borderRadius: '8px' }}>
                        📘 Facebook
                      </button>
                      <button className="btn btn-outline btn-sm flex-1" style={{ borderRadius: '8px' }}>
                        💼 LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grievance */}
              <div className="card bg-yellow-50 border border-yellow-200 shadow-xl" style={{ borderRadius: '16px' }}>
                <div className="card-body p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">⚖️</span>
                    <h3 className="text-lg font-bold text-yellow-800">Grievance & Feedback</h3>
                  </div>
                  <p className="text-sm text-yellow-700 mb-3">
                    For formal complaints or feedback
                  </p>
                  <p className="text-sm font-medium text-yellow-800">
                    📧 grievance@loanlink.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
