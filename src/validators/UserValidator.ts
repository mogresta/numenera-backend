import Joi from "joi";

export const userLoginValidation = Joi.object({
  username: Joi.string().when("email", {
    is: Joi.exist(),
    then: Joi.allow(""),
  }),
  email: Joi.string().when("name", { is: Joi.exist(), then: Joi.allow("") }),
  token: Joi.string().required(),
  password: Joi.string().required(),
});

export const userPostValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
