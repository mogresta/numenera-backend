import Joi from "joi";

export const characterCreateValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  tier: Joi.number().required(),
  characterType: Joi.number().required(),
  user: Joi.number().required(),
});

export const characterUpdateValidation = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  tier: Joi.number().required(),
  characterType: Joi.number().required(),
});

export const characterDeleteValidation = Joi.object({
  user: Joi.number().required(),
});
