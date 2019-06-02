import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("db is connected😏");
};

const handleError = error => {
  console.log("db is not connected💢");
};

db.once("open", handleOpen);
db.on("error", handleError);
