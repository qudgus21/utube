import dotenv from "dotenv";
import passport from "passport";
import User from "./models/User";
import GitHubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/globalController";
import routes from "./routes";

dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://polar-brushlands-17902.herokuapp.com${
        routes.githubCallback
      }`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
