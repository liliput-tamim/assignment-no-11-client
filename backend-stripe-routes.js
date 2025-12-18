// Add these routes to your Express server (assingment-no-11-server)

const stripe = require('stripe')('sk_test_51SehapE6oMsfYE0vgFjtAhsEe84Orj3jb81q8zWmxyiKG4nx5VKXFVhMYcQh7JUQSyn7e2GA4JbT7Clw7JkljUYg001gmauY6r');

// Create payment session
app.post('/create-payment-session', async (req, res) => {
  try {
    const { applicationId, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Loan Application Fee',
            description: 'Processing fee for loan application'
          },
          unit_amount: amount, // $10 = 1000 cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/dashboard`,
      metadata: {
        applicationId: applicationId
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment and update application
app.post('/verify-payment', async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      const applicationId = session.metadata.applicationId;
      
      // Update application fee status to paid
      await db.collection('applications').updateOne(
        { _id: new ObjectId(applicationId) },
        { $set: { applicationFeeStatus: 'paid' } }
      );
      
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Optional: Webhook for real-time payment updates
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'your_webhook_secret');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const applicationId = session.metadata.applicationId;
    
    // Update application fee status
    await db.collection('applications').updateOne(
      { _id: new ObjectId(applicationId) },
      { $set: { applicationFeeStatus: 'paid' } }
    );
  }

  res.json({received: true});
});