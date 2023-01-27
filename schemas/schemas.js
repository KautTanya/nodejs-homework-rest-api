const Joi = require("joi");
const shemaPost = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().alphanum().min(10).max(13).required(),
  });

  const shemaPut = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().alphanum().min(10).max(13),
  });

  module.exports = {
    shemaPost,
    shemaPut,
  }