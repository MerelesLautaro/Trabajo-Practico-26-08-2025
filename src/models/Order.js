import Joi from 'joi';

const orderSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  items: Joi.array().items(Joi.string().min(1)).min(1).required(),
  status: Joi.string().valid('pending', 'in_process', 'delivered').required()
});

export default orderSchema;
