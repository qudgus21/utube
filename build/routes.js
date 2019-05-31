"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; // users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/:id/edit";
var CHANGE_PASSWORD = "/:id/change_password"; // videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/edit/:id";
var DELETE_VIDEO = "/delete/:id"; // githubLogin

var GITHUB_LOGIN = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback";
var ME = "/me"; // api

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var UPDATE_COMMENT = "/:id/updateComment";
var DELETE_COMMENT = "/:id/deleteComment";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    }

    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    }

    return VIDEO_DETAIL;
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/edit/".concat(id);
    }

    return EDIT_VIDEO;
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/delete/".concat(id);
    }

    return DELETE_VIDEO;
  },
  githubLogin: GITHUB_LOGIN,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  updateComment: UPDATE_COMMENT,
  deleteComment: DELETE_COMMENT
};
var _default = routes;
exports["default"] = _default;