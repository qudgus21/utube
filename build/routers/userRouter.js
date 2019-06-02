"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

var userRouter = _express["default"].Router();

userRouter.get(_routes["default"].userDetail(), _userController.userDetail);
userRouter.get(_routes["default"].editProfile, _middlewares.onlyPrivate, _userController.getEditProfile);
userRouter.post(_routes["default"].editProfile, _middlewares.onlyPrivate, _middlewares.uploadAavatar, _userController.postEditProfile);
userRouter.get(_routes["default"].changePassword, _middlewares.onlyPrivate, _userController.getChangePassword);
userRouter.post(_routes["default"].changePassword, _middlewares.onlyPrivate, _userController.postChangePassword);
var _default = userRouter;
exports["default"] = _default;