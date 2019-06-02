"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDeleteComment = exports.postUpdateComment = exports.postAddComment = exports.postRegisterView = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _User = _interopRequireDefault(require("../models/User"));

var getUpload = function getUpload(req, res) {
  res.render("upload", {
    pageTitle: "upload"
  });
};

exports.getUpload = getUpload;

var postUpload =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, description, location, newVideo;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            _context.next = 3;
            return _Video["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 3:
            newVideo = _context.sent;
            req.user.videos.push(newVideo);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo.id));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postUpload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var videoDetail =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var id, video, videos, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Video["default"].findById(id).populate("creator").populate("comments");

          case 4:
            video = _context2.sent;
            _context2.next = 7;
            return _Video["default"].find({
              creator: video.creator.id
            }).sort({
              _id: -1
            });

          case 7:
            videos = _context2.sent;
            _context2.next = 10;
            return _User["default"].findById(video.creator.id);

          case 10:
            user = _context2.sent;
            res.render("videoDetail", {
              pageTitle: "video.title",
              video: video,
              videos: videos,
              user: user // users

            });
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.redirect(_routes["default"].home);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 14]]);
  }));

  return function videoDetail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var id, video;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context3.sent;
            res.render("editVideo", {
              pageTitle: "Edit ".concat(video.title),
              video: video
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function getEditVideo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, title, description;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function postEditVideo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findOneAndRemove({
              _id: id
            });

          case 4:
            res.redirect(_routes["default"].home);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function deleteVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteVideo = deleteVideo;

var postRegisterView =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var id, video;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context6.sent;
            video.views += 1;
            video.save();
            res.status(200);
            _context6.next = 13;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](1);
            res.status(400);

          case 13:
            _context6.prev = 13;
            res.end();
            return _context6.finish(13);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 10, 13, 16]]);
  }));

  return function postRegisterView(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postRegisterView = postRegisterView;
var newComment = {};

var postAddComment =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var id, comment, user, video;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            console.log(id);
            console.log(comment);
            console.log(user);
            _context7.prev = 4;
            _context7.next = 7;
            return _Video["default"].findById(id);

          case 7:
            video = _context7.sent;
            _context7.next = 10;
            return _Comment["default"].create({
              text: comment,
              creator: user.id,
              avatarUrl: user.avatarUrl,
              name: user.name
            });

          case 10:
            newComment = _context7.sent;
            video.comments.push(newComment.id);
            video.save();
            _context7.next = 18;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](4);
            res.status(400);

          case 18:
            _context7.prev = 18;
            res.json({
              content: user,
              commentId: newComment.id
            });
            return _context7.finish(18);

          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 15, 18, 21]]);
  }));

  return function postAddComment(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postAddComment = postAddComment;

var postUpdateComment =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(req, res) {
    var id, _req$body3, comment, commentId, user;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id, _req$body3 = req.body, comment = _req$body3.comment, commentId = _req$body3.commentId, user = req.user;
            _context8.prev = 1;
            _context8.next = 4;
            return _Comment["default"].findOneAndUpdate({
              _id: commentId
            }, {
              text: comment
            });

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 9:
            _context8.prev = 9;
            res.end();
            return _context8.finish(9);

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 6, 9, 12]]);
  }));

  return function postUpdateComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postUpdateComment = postUpdateComment;

var postDeleteComment =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(req, res) {
    var id, commentId;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, commentId = req.body.commentId;
            _context9.prev = 1;
            _context9.next = 4;
            return _Comment["default"].findOneAndRemove({
              _id: commentId
            });

          case 4:
            _context9.next = 9;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 9:
            _context9.prev = 9;
            res.end();
            return _context9.finish(9);

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 6, 9, 12]]);
  }));

  return function postDeleteComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postDeleteComment = postDeleteComment;