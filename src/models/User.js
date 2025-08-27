import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(1).required(),
  rol: Joi.string().valid('admin', 'client').required()
});

export default userSchema;
