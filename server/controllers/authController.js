const User = require('../models/User');
const {
  BadRequestError,
  UnauthenticatedError,
} = require('../errors/customErrors');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { createJWT, attachCookieToResponse } = require('../utils/tokenUtils');
const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide password and email');
  }

  const user = await User.findOne({ email });

  const isValidUser = user && (await comparePassword(password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });
  attachCookieToResponse({ res, token });

  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name) {
    throw new BadRequestError('Please provide name and email');
  }

  const emailAlreadyInUse = await User.findOne({ email });
  if (emailAlreadyInUse) {
    throw new BadRequestError('Account already exists,login please');
  }

  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? 'admin' : 'user';
  const hashedPassword = await hashPassword(password);
  await User.create({ email, name, password: hashedPassword, role });

  return res.status(200).json({
    msg: 'user created',
  });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  login,
  register,
  logout,
};
