const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  name: Joi.string().min(6).max(20).required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).max(255).required(),
});
const registerValidate = (data) => {
  const value = registerSchema.validate(data);
  return value;
};

//
const loginSchema = Joi.object({
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).max(255).required(),
});
const loginValidate = (data) => {
  const value = loginSchema.validate(data);
  return value;
};

//
const invoiceSchema = Joi.object({
  address: Joi.string().required(),
  discount: Joi.object({
    amount: Joi.number(),
    applyTime: Joi.date(),
    code: Joi.string(),
    percent: Joi.number(),
    _id: Joi.string(),
  }).allow(null),
  email: Joi.string().email().required(),
  logistics: Joi.string().required(),
  name: Joi.string().required(),
  no: Joi.string().length(13).required(),
  order: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        img: Joi.string().uri(),
        name: Joi.string(),
        price: Joi.number().integer(),
        quantity: Joi.number().integer(),
        size: Joi.number().max(44).integer(),
      })
    )
    .required(),
  payment: Joi.object().required(),
  status: Joi.string().required(),
  tel: Joi.string().required(),
});
const invoiceValidate = (data) => {
  const value = invoiceSchema.validate(data);
  return value;
};

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
module.exports.invoiceValidate = invoiceValidate;
