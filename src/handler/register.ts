import express, {Request, Response} from 'express';
import Joi from 'joi';
import {register} from "../service/register";

const router = express.Router();

const userSchema = Joi.object({
  telegramID: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().required()
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const {error, value} = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({message: 'Invalid argument', details: error.details});
    }

    const response = await register(value);
    res.status(response.status).json({message: response.message});

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({message: 'Error registering user'});
  }
});

export default router;
