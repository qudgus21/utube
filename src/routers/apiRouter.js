import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  postUpdateComment,
  postDeleteComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.updateComment, postUpdateComment);
apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
