import { UnauthorizedAccess } from '../exceptions/UnauthorizedAccess.js';
import { UserNotFound } from '../exceptions/UserNotFound.js';
import { ResourceNotFound } from '../exceptions/ResourceNotFound.js';

export function errorHandler(err, req, res, next) {

  if (err instanceof UnauthorizedAccess) {
    return res.status(403).json({ message: err.message });
  } else if (err instanceof UserNotFound || ResourceNotFound ) {
    return res.status(404).json({ message: err.message })
  }

  const status = err.status || 500;
  const message = err.message || 'Internal error server';

  res.status(status).json({ error: message });
}
