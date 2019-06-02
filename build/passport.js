"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("./models/User"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _globalController = require("./controllers/globalController");

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: "a6c7f1df315d0ff0f32c",
  clientSecret: "e870cf97a9bebcc79667003e2ce0a9ec401251bc",
  callbackURL: "http://localhost:3000/auth/github/callback"
}, _globalController.githubLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());