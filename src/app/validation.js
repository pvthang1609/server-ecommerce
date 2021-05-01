const Joi = require("@hapi/joi");

//register
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).max(255).required(),
  urlAvatar: Joi.string(),
});
const registerValidate = (data) => {
  const value = registerSchema.validate(data);
  return value;
};

//login
const loginSchema = Joi.object({
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).max(255).required(),
});
const loginValidate = (data) => {
  const value = loginSchema.validate(data);
  return value;
};

//invoice
const orderSchema = Joi.object({
  address: Joi.string().required(),
  discount: Joi.string().allow(null),
  email: Joi.string().email().required(),
  logistics: Joi.string().required(),
  name: Joi.string().required(),
  order: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        quantity: Joi.number().integer(),
        size: Joi.number().max(44).integer(),
      })
    )
    .required(),
  payment: Joi.string().required(),
  status: Joi.string().required(),
  tel: Joi.string().required(),
});
const orderValidate = (data) => {
  const value = orderSchema.validate(data);
  return value;
};

//rating
const ratingSchema = Joi.object({
  id_product: Joi.string().required(),
  star: Joi.number().required(),
  comment: Joi.string(),
});
const ratingValidate = (data) => {
  const value = ratingSchema.validate(data);
  return value;
};

//product
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(100).required(),
  brand: Joi.string(),
  type: Joi.string().required(),
  gender: Joi.string(),
  tag: Joi.string(),
  img: Joi.array().items(Joi.string()),
  desc: Joi.string(),
});
const productValidate = (data) => {
  const value = productSchema.validate(data);
  return value;
};

//detailProduct
const detailProductSchema = Joi.object({
  id_product: Joi.string().required(),
  inventory: Joi.array().items(
    Joi.object({
      size: Joi.number().required(),
      amount: Joi.number().required(),
    })
  ),
  posts: Joi.string(),
  favorite: Joi.number(),
});
const detailProductValidate = (data) => {
  const value = detailProductSchema.validate(data);
  return value;
};

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
module.exports.orderValidate = orderValidate;
module.exports.ratingValidate = ratingValidate;
module.exports.productValidate = productValidate;
module.exports.detailProductValidate = detailProductValidate;
