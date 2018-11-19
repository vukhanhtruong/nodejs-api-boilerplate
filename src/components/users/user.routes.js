/**
 * User Routes
 */

import { Router } from 'express';
import validate from 'express-validation';
import * as UserController from './user.controller';
import * as AuthenticationController from './authentication.controller';
import { authLocal } from '@/services/auth';
import limitLoginRequests from '@/utils/brute';

const routes = new Router();

routes.post(
  '/signup',
  limitLoginRequests,
  validate(UserController.validation.create),
  UserController.create,
);
routes.post(
  '/login',
  limitLoginRequests,
  validate(AuthenticationController.validation.login),
  authLocal,
  AuthenticationController.login,
);

export default routes;
