const axios = require('axios');
require('dotenv').config(); 

const CreditCardPayment = async (req, res) => {
  const { cart, discount, paymentDetails } = req.body;

  const total = cart.reduce((acc, course) => acc + course.charges, 0);
  const discountedTotal = total - total * discount;

  try {
    const apiKey = process.env.PAYONEER_API_KEY;

    const payoneerResponse = await axios.post('https://api.payoneer.com/v4/transactions', {
      amount: discountedTotal,
      currency: 'USD', 
      paymentMethod: 'card',
      cardDetails: paymentDetails,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const { transactionId } = payoneerResponse.data;

    res.status(200).json({ message: 'Payment successful', transactionId });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
};

module.exports = {
  CreditCardPayment,
};
