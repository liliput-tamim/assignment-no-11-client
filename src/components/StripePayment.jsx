import { useState } from 'react';
import { toast } from 'react-toastify';

const StripePayment = ({ applicationId, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/create-payment-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          applicationId,
          amount: 1000 // $10 in cents
        })
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={loading}
      className="btn btn-sm btn-primary"
    >
      {loading ? 'Processing...' : 'Pay $10'}
    </button>
  );
};

export default StripePayment;