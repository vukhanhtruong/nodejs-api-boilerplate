/**
 * User Routes
 */

import { Router } from 'express';
import validate from 'express-validation';
import * as UserController from './user.controller';
import * as AuthenticationController from './authentication.controller';
import { authLocal, authJwt } from '@/services/auth';
import limitRequests from '@/utils/brute';

const routes = new Router();

// anonymous
routes.post(
  '/signup',
  limitRequests,
  validate(UserController.validation.create),
  UserController.create,
);

routes.post(
  '/login',
  limitRequests,
  validate(AuthenticationController.validation.login),
  authLocal,
  AuthenticationController.login,
);

// agency
routes.get('/', authJwt, UserController.getUser);

// admin
routes.get('/:id', authJwt, UserController.getUser);

export default routes;
