import Joi from "joi";

export const characterPostValidation = Joi.object({
  name: Joi.string().required(),
  tier: Joi.number().required(),
  user: Joi.number().required(),
});

export const characterDeleteValidation = Joi.object({
  user: Joi.number().required(),
});
