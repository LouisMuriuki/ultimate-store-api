import Connect from "./mongo/Connect.js";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js"
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(express.json({ limit: "50mb" }));

app.get("/", userRoute);

const startServer = async () => {
  try {
    Connect(process.env.MONGO_URL);
    app.listen(5000, () => {
      console.log("we up");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
