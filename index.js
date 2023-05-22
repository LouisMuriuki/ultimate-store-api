import Connect from "./mongo/Connect.js";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js"
import authRoute from "./routes/authRoute.js"
import productRoute from "./routes/productRoutes.js"
import cartRoute from "./routes/cartRoutes.js"
import orderRoute from "./routes/orderRoutes.js"
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products",productRoute)
app.use("/api/v1/cart",cartRoute)
app.use("/api/v1/orders",orderRoute)
app.use("/api/v1/stripe",orderRoute)

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
