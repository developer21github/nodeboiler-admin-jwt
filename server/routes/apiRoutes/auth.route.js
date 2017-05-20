import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import Joi from 'joi';
import authCtrl from '../../controllers/auth.controller';
import config from '../../../config/env';

const router = express.Router(); // eslint-disable-line new-cap
const paramValidation = {
  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};

/** POST /auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

/** GET /auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

export default router;
