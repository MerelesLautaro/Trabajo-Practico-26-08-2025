import { UnauthorizedAccess } from '../exceptions/UnauthorizedAccess.js';

export function authorizedRole(req, res, next) {
  const isAdmin = req.query.isAdmin;

  if (isAdmin == 'true') {
    throw new UnauthorizedAccess();
  }

  next();
}