import express from "express";
import routes from "../routes";
import {
  home,
  getLogin,
  logout,
  search,
  getJoin,
  postJoin,
  postLogin,
  githubCallback,
  postGithubLogIn,
  getMe
} from "../controllers/globalController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

// auth

globalRouter.get(
  routes.githubLogin,
  passport.authenticate("github", {
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
  })
);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.me, onlyPrivate, getMe);

export default globalRouter;
