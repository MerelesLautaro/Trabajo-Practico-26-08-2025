import Joi from 'joi';

const updateStateRequest = Joi.object({
  status: Joi.string().valid('pending', 'in_process', 'delivered').required()
});

export default updateStateRequest;
