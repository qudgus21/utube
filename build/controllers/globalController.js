"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMe = exports.postGithubLogIn = exports.githubLoginCallback = exports.search = exports.logout = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = exports.home = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var _passport = _interopRequireDefault(require("passport"));

var home =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var videos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({}).sort({
              _id: -1
            });

          case 3:
            videos = _context.sent;
            res.render("home", {
              pageTitle: "home",
              videos: videos
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.render("home", {
              pageTitle: "home",
              videos: []
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var getJoin = function getJoin(req, res) {
  res.render("join", {
    pageTitle: "join"
  });
};

exports.getJoin = getJoin;

var postJoin =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context2.next = 7;
              break;
            }

            req.flash("error", "Passwords don't match");
            res.status(400);
            res.render("join", {
              pageTitle: "Join"
            });
            _context2.next = 20;
            break;

          case 7:
            _context2.prev = 7;
            _context2.next = 10;
            return (0, _User["default"])({
              name: name,
              email: email
            });

          case 10:
            user = _context2.sent;
            _context2.next = 13;
            return _User["default"].register(user, password);

          case 13:
            next();
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](7);
            console.log(_context2.t0);
            res.redirect(_routes["default"].home);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 16]]);
  }));

  return function postJoin(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render("login", {
    pageTitle: "login"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  successRedirect: _routes["default"].home,
  successFlash: "Welcome",
  failureRedirect: _routes["default"].login,
  failureFlash: "Can't log in. Check email and/or password"
});

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var search =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var searchingBy, videos;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            searchingBy = req.query.search;
            videos = [];
            _context3.prev = 2;
            _context3.next = 5;
            return _Video["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 5:
            videos = _context3.sent;
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);

          case 11:
            console.log(videos);
            res.render("search", {
              pageTitle: "Search",
              searchingBy: searchingBy,
              videos: videos
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 8]]);
  }));

  return function search(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.search = search;

var githubLoginCallback =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(accessToken, refreshToken, profile, cb) {
    var _profile$_json, id, avatar_url, name, email, user, newUser;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatar_url = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context4.sent;

            if (!user) {
              _context4.next = 10;
              break;
            }

            user.githubId = id;
            user.save();
            user.avatarUrl = avatar_url;
            return _context4.abrupt("return", cb(null, user));

          case 10:
            _context4.next = 12;
            return _User["default"].create({
              name: name,
              email: email,
              githubId: id,
              avatarUrl: avatar_url
            });

          case 12:
            newUser = _context4.sent;
            return _context4.abrupt("return", cb(null, newUser));

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", cb(_context4.t0));

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 16]]);
  }));

  return function githubLoginCallback(_x8, _x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGithubLogIn = function postGithubLogIn(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postGithubLogIn = postGithubLogIn;

var getMe =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var id, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.user.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].findById(id).populate("videos");

          case 4:
            user = _context5.sent;
            res.render("userDetail", {
              pageTitle: "Me",
              user: user
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function getMe(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getMe = getMe;