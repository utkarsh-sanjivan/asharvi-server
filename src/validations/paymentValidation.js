const Joi = require('joi');

const paymentValidation = {
  createRazorpayOrder: Joi.object({
    amount: Joi.number().positive().min(1).required(),
    currency: Joi.string().valid('INR').default('INR'),
    receipt: Joi.string().max(64),
    notes: Joi.object().unknown(true)
  })
};

module.exports = paymentValidation;
