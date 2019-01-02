/**
 * @ref https://github.com/nyambati/express-acl
 */
import jwt from 'jsonwebtoken';
import constants from '@/config/constants';

const IS_ADMIN = 'admin';
const IS_STAFF = 'staff';
const IS_ANONYMOUS = 'anonymous';

const isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ').pop();
    if (!token) {
      return next(new Error('No token Provided'));
    }

    jwt.verify(token, constants.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.send(err);
      }

      req.user = decoded;
    });
  }
  next();
};

export { isAuthenticated, IS_ADMIN, IS_STAFF, IS_ANONYMOUS };
