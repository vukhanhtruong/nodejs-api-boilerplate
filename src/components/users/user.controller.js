/**
 * User controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';
import { filteredBody } from '@/utils/filteredBody';
import constants from '@/config/constants';
import User from './user.model';

export const validation = {
  create: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z!@#$%^&*])([a-zA-Z!@#?$%^&*0-9]+)$/)
        .required(),
      name: Joi.string().required(),
      company: Joi.string().required(),
      phone: Joi.number().required(),
    },
  },
};

/**
 * @api {post} /users/signup Create a user
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup User
 * @apiPermission anonymous
 *
 * @apiParam (Body) {String} email User's email.
 * @apiParam (Body) {String} password User's password.
 *
 * @apiSuccess {String} _id User's id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 * {
 *  "message": "validation error",
 *  "errors": {
 *      "email": "email is required"
 *   }
 * }
 */
export async function create(req, res, next) {
  const body = filteredBody(req.body, constants.WHITELIST.users.create);
  try {
    const user = await User.create(body);
    const userToken = user.toAuthJSON();
    return res.status(HTTPStatus.CREATED).json(userToken);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

/**
 * @api {get} /users Get info of a user
 * @apiDescription Get info of a user
 * @apiName getUser
 * @apiGroup User
 * @apiPermission agency
 *
 * @apiHeader {Authorization} Authorization Bearer Token
 * @apiSuccess {Object} User Object user
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  email: 'abc@gmail.com',
 *  role: 'agency',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 403 Forbidden
 *
 * {
 *   "status": 403,
 *   "success": false,
 *   "message": "You are not authorized to access this resource"
 * }
 */
export async function getUser(req, res, next) {
  try {
    const id = req.params.id || req.user._id;
    const user = await User.findById(id);
    return res.status(HTTPStatus.OK).json(user);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
