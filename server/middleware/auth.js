import mongoose from "mongoose";

const User = mongoose.model("User");
const isAuthenticated = req => !!req.session.userId;

const login = (req, userId) => {
  req.session.userId = userId;
  return req.session.userId;
};

const logout = (req, callback) => req.session.destroy(callback);

export const requiresToBeLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ msg: "not logged in." });
};

export const requiresNotToBeLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.status(403).json({ msg: "already logged in." });
};

export const parseAuthUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  const { userId } = req.session;
  User.findById(userId).then(user => {
    req.user = user;
  });
  return next();
};

export const initAuth = (req, res, next) => {
  req.isAuthenticated = () => isAuthenticated(req);
  req.login = userId => login(req, userId);
  req.logout = callback => logout(req, callback);
  return next();
};
