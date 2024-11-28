import Joi from "joi";

export const postHealthCheckValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
});
