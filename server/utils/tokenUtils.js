const jwt = require('jsonwebtoken');

const createJWT = payload => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const attachCookieToResponse = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
};

const verifyJWT = token => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = { verifyJWT, attachCookieToResponse, createJWT };
