import passport from "passport";
import User from "./models/User";
import GitHubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/globalController";

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: "a6c7f1df315d0ff0f32c",
      clientSecret: "e870cf97a9bebcc79667003e2ce0a9ec401251bc",
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
