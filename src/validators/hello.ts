import Joi from 'joi';

const adminHelloSchema = Joi.object({
  telegramId: Joi.string().required(),
  text: Joi.string().required()
});

export const validate = (telegramId: string, text: string) => {
  return adminHelloSchema.validate({ telegramId, text });
};