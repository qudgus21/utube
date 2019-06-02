import dotenv from "dotenv";
import app from "./app";
import "./db";
import "@babel/polyfill";
import "./models/Video";
import "./models/Comment";
import "./models/User";
import "babel-core/register";
import "babel-polyfill";

dotenv.config();

const handlelistening = () => {
  console.log("server is connected😀");
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, handlelistening);
