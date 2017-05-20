import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import adminCtrl from '../../controllers/admin.controller';

const router = express.Router(); // eslint-disable-line new-cap
const paramValidation = {
  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};

/** POST /auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), adminCtrl.loginAuth);

export default router;

