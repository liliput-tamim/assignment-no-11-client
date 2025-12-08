import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">LoanLink</h3>
            <p className="text-sm">
              A comprehensive microloan request, review & approval management system 
              designed to streamline loan applications and repayments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/all-loans" className="link link-hover">All Loans</Link></li>
              <li><Link to="/about" className="link link-hover">About Us</Link></li>
              <li><Link to="/contact" className="link link-hover">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <p className="text-sm">Email: info@loanlink.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
      <div className="border-t border-base-300 py-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} LoanLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
