const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../utils/CustomError');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new CustomError('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new CustomError('No user found with this id', 404));
    }

    next();
  } catch (error) {
    return next(new CustomError('Not authorized to access this route', 401));
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
  };
};
