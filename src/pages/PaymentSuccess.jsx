import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  
  const sessionId = searchParams.get('session_id');
  const applicationId = searchParams.get('app_id');

  useEffect(() => {
    if (sessionId && applicationId) {
      verifyPayment();
    }
  }, [sessionId, applicationId]);

  const verifyPayment = async () => {
    try {
      const response = await fetch("http://localhost:4000/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, applicationId })
      });

      const result = await response.json();
      
      if (result.success) {
        setPaymentDetails({
          sessionId,
          amount: 10,
          currency: "USD",
          paidAt: new Date().toISOString()
        });
        toast.success("Payment verified successfully!");
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      toast.error("Error verifying payment");
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-md mx-auto card bg-white shadow-2xl">
        <div className="card-body text-center p-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your loan application fee has been processed successfully.
          </p>
          
          {paymentDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Payment Details:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">${paymentDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Currency:</span>
                  <span>{paymentDetails.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(paymentDetails.paidAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Session ID:</span>
                  <span className="font-mono text-xs">{paymentDetails.sessionId.substring(0, 20)}...</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Link to="/dashboard/my-loans" className="btn btn-primary w-full">
              View My Applications
            </Link>
            <Link to="/dashboard" className="btn btn-outline w-full">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;