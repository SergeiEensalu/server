import Joi from 'joi';

const userPermissionSchema = Joi.object({
  telegramId: Joi.string().required(),
  admin: Joi.number().valid(0, 1).required().messages({
    'number.base': 'Admin argument must be a number.',
    'any.only': 'Invalid admin argument. Only 0 or 1 are allowed.'
  })
});

export const validateUserPermission = (telegramId: string, admin: number) => {
  return userPermissionSchema.validate({ telegramId, admin });
};