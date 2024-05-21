const { UnauthenticatedError } = require('../errors/customErrors');
const { verifyJWT } = require('../utils/tokenUtils');

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const payload = verifyJWT(token);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
