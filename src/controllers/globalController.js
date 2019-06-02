import Video from "../models/Video";
import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "home", videos: [] });
  }
};

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    req.flash("error", "Passwords don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: "../uploads/profile.png"
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "login" });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureRedirect: routes.login,
  failureFlash: "Can't log in. Check email and/or password"
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const search = async (req, res) => {
  const {
    query: { search: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      user.avatarUrl = avatar_url;
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const {
    user: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "Me", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
