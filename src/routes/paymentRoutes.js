const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { validateRequest } = require('../validations/commonValidation');
const paymentValidation = require('../validations/paymentValidation');

router.post(
  '/razorpay/order',
  validateRequest(paymentValidation.createRazorpayOrder),
  paymentController.createRazorpayOrder
);

module.exports = router;
