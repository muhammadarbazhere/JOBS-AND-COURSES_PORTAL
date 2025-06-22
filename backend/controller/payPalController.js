const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

// PayPal client configuration
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const createPayPalOrder = async (req, res) => {
  const { cart, discount } = req.body;

  // Calculate total and discounted total
  const total = cart.reduce((acc, course) => acc + course.charges, 0);
  const discountedTotal = total - total * discount;

  // Create PayPal order request
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: discountedTotal.toFixed(2),
        },
      }
    ],
    application_context: {
      return_url: `${process.env.FRONTEND_BASE_URL}/order-success`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/cart`,
    },
  });

  try {
    const order = await client.execute(request);
    const approvalLink = order.result.links.find(link => link.rel === 'approve').href;
    res.status(201).json({ redirectUrl: approvalLink });
  } catch (err) {
    console.error("Error creating PayPal order:", err.response?.data || err);
    res.status(500).send("Error creating PayPal order");
  }
};

module.exports = {
  createPayPalOrder,
};
