import express, {Request, Response} from 'express';
import Joi from 'joi';

import {login} from "../service/login";

const router = express.Router();

const loginSchema = Joi.object({
  telegramID: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().required()
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const {error, value} = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({message: 'Invalid argument', details: error.details});
    }

    const response = await login(value);
    res.status(response.status).json({message: response.message, user: response.user});

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({message: 'Error logging in'});
  }
});

export default router;
