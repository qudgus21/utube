"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _globalController = require("../controllers/globalController");

var _middlewares = require("../middlewares");

var _passport = _interopRequireDefault(require("passport"));

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].home, _globalController.home);
globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _globalController.getJoin);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _globalController.postJoin, _globalController.postLogin);
globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _globalController.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _globalController.postLogin);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _globalController.logout);
globalRouter.get(_routes["default"].search, _globalController.search); // auth

globalRouter.get(_routes["default"].githubLogin, _passport["default"].authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time"
}));
globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate("github", {
  failureRedirect: "/login"
}), _globalController.postGithubLogIn);
globalRouter.get(_routes["default"].me, _middlewares.onlyPrivate, _globalController.getMe);
var _default = globalRouter;
exports["default"] = _default;