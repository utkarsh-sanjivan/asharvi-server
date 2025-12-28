const paymentService = require('../services/paymentService');
const { sanitizeInput } = require('../validations/commonValidation');

/**
 * Create a Razorpay order (test or live based on env keys)
 *
 * @params {req}: Request - Express request object
 * @params {res}: Response - Express response object
 * @params {next}: Function - Next middleware
 * @returns Razorpay order details
 */
const createRazorpayOrder = async (req, res, next) => {
  try {
    const sanitizedData = sanitizeInput(req.body);
    const order = await paymentService.createRazorpayOrder(sanitizedData);

    res.status(201).json({
      success: true,
      message: 'Razorpay order created successfully',
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        keyId: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRazorpayOrder
};
