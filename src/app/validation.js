const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  name: Joi.string().min(6).max(20).required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).max(255).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).max(255).required(),
});

const registerValidate = (data) => {
  const value = registerSchema.validate(data);
  return value;
};
const loginValidate = (data) => {
  const value = loginSchema.validate(data);
  return value;
};

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
