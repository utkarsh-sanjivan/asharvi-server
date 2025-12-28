const Razorpay = require('razorpay');
const logger = require('../utils/logger');

let razorpayClient;

const getRazorpayClient = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    const error = new Error('Razorpay keys are not configured');
    error.statusCode = 500;
    error.code = 'RAZORPAY_CONFIG_MISSING';
    throw error;
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET
    });
  }

  return razorpayClient;
};

const createRazorpayOrder = async ({ amount, currency = 'INR', receipt, notes }) => {
  const amountInPaise = Math.round(Number(amount) * 100);

  if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
    const error = new Error('Invalid amount for Razorpay order');
    error.statusCode = 400;
    error.code = 'INVALID_AMOUNT';
    throw error;
  }

  try {
    const client = getRazorpayClient();
    const order = await client.orders.create({
      amount: amountInPaise,
      currency,
      receipt,
      notes
    });

    logger.info('Razorpay order created', {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status
    });

    return order;
  } catch (error) {
    logger.error('Razorpay order creation failed', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

module.exports = {
  createRazorpayOrder
};
