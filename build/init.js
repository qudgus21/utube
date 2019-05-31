"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

require("./db");

require("@babel/polyfill");

require("./models/Video");

require("./models/Comment");

require("./models/User");

_dotenv["default"].config();

var handlelistening = function handlelistening() {
  console.log("server is connected😀");
};

var PORT = process.env.PORT || 3000;

_app["default"].listen(PORT, handlelistening);