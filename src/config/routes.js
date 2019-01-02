/**
 * API Routes
 */

import { Router } from 'express';
import HTTPStatus from 'http-status';
import UserRoutes from '@/components/users/user.routes';
import APIError from '@/services/error';
import acl from 'express-acl';
import { isAuthenticated, IS_ANONYMOUS } from '@/services/acl';
import logErrorService from '@/services/log';

acl.config({
  baseUrl: 'api',
  // filename: 'acl.json',
  // path: 'src/config',
  defaultRole: IS_ANONYMOUS,
  decodedObjectName: 'user', // this module will look for req.user.role
  roleSearchPath: 'user.role', // will search for role in req.user.role
  denyCallback: res => {
    return res.status(403).json({
      status: HTTPStatus.FORBIDDEN,
      success: false,
      message: 'You are not authorized to access this resource',
    });
  },
});

const routes = new Router();

routes.use([isAuthenticated, acl.authorize]);

routes.use('/users', UserRoutes);

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);

export default routes;
