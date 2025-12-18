import { useState } from "react";
import { toast } from "react-toastify";

const PaymentModal = ({ isOpen, onClose, applicationId, amount = 10 }) => {
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Create Stripe checkout session
      const response = await fetch("http://localhost:4000/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId })
      });
      
      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe checkout
        window.location.href = url;
      } else {
        throw new Error("Failed to create payment session");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  const resetModal = () => {
    setPaymentSuccess(false);
    setPaymentDetails(null);
    setProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        {!paymentSuccess ? (
          <>
            <h3 className="font-bold text-lg mb-4">💳 Payment Required</h3>
            <div className="space-y-4">
              <div className="alert alert-info">
                <span>Application fee payment is required to process your loan application.</span>
              </div>
              <div className="card bg-base-200 p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Application Fee:</span>
                  <span className="text-2xl font-bold text-primary">${amount}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Secure payment powered by Stripe
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Payment Method</span>
                </label>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <span className="text-2xl">💳</span>
                  <span>Stripe Payment Gateway</span>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button 
                onClick={handlePayment} 
                className={`btn btn-primary ${processing ? 'loading' : ''}`}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay $${amount}`}
              </button>
              <button onClick={resetModal} className="btn" disabled={processing}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg mb-4 text-success">✅ Payment Successful!</h3>
            <div className="space-y-4">
              <div className="alert alert-success">
                <span>Your payment has been processed successfully.</span>
              </div>
              <div className="card bg-base-200 p-4">
                <h4 className="font-semibold mb-3">Payment Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono">{paymentDetails?.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-bold">${paymentDetails?.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>{paymentDetails?.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="badge badge-success">{paymentDetails?.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date(paymentDetails?.paidAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button onClick={resetModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default PaymentModal;