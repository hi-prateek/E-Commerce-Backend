const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.processPayment = async (req, res) => {
  const { amount, currency, token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      source: token,
      description: 'Test Charge'
    });

    res.status(200).json({
      success: true,
      charge
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getPaymentStatus = (req, res) => {
  const paymentId = req.params.paymentId;

  // Simulate a payment status check. In a real-world scenario, this would be an API call.
  res.json({
    paymentId,
    status: 'success' // or 'failed'
  });
};
