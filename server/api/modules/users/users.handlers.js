import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");
const DEFAULT_PASSWORD_HASH =
  "$2a$04$dly.zbwDpj/q7tEvH6ZEm.LFkVkFzEUS/ETrXkXrQHqRFkwi8Gi1e";
const userToSend = userDoc => ({
  username: userDoc.username,
  email: userDoc.email
});

export const userRegister = (req, res, next) => {
  const { username, password, email } = req.body;
  const userFindQuery = {
    $or: [{ username }, { email }]
  };
  User.findOne(userFindQuery).then(user => {
    if (user) {
      return res
        .status(403)
        .json({ msg: "Please provide unique username and email" });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: passwordHash,
      email
    });
    newUser
      .save()
      .then(savedUser => {
        req.login(savedUser._id);
        return res.status(200).json({ user: userToSend(savedUser) });
      })
      .catch(error => next(error));
  });
};

export const userLogin = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    // prevent timing attacks
    const passwordHash = user ? user.password : DEFAULT_PASSWORD_HASH;
    const isUserValid = bcrypt.compareSync(password, passwordHash);
    if (!user) {
      return res
        .status(403)
        .json({ msg: "Invalid username.", credential: username });
    } else if (!isUserValid) {
      return res
        .status(403)
        .json({ msg: "Invalid password.", credential: password });
    }
    req.login(user._id);
    return res.status(200).json({ user: userToSend(user) });
  });
};

export const userLogout = (req, res, next) => {
  req.logout(error => {
    if (error) {
      return next(error);
    }
    return res.status(200).json({ msg: "Logout success." });
  });
};

export const userCheckLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    const { userId } = req.session;
    return User.findById(userId)
      .then(user => res.status(200).json({ user: userToSend(user) }))
      .catch(error => next(error));
  }
  return res.status(401).json({ msg: "Not logged in." });
};
