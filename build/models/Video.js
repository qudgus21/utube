"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var VideoSchema = new _mongoose["default"].Schema({
  fileUrl: {
    type: String,
    required: "fileUrl is required"
  },
  title: {
    type: String,
    required: "title is required"
  },
  description: {
    type: String
  },
  views: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
});

var model = _mongoose["default"].model("Video", VideoSchema);

var _default = model;
exports["default"] = _default;