"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var CommentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: "text is required"
  },
  creadtedAt: {
    type: Date,
    "default": Date.now
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  avatarUrl: String,
  name: String
});

var model = _mongoose["default"].model("Comment", CommentSchema);

var _default = model;
exports["default"] = _default;