import Joi from "joi";

export const userLoginValidation = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});

export const userPostValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
