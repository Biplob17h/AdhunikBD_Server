import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import vendorRouter from "./routes/vendorRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import subCategoryRoute from "./routes/subCategoryRoutes.js";

// APP
const app = express();

// CONFIG
dotenv.config();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/auth/user", userRouter);
app.use("/api/v1/auth/vendor", vendorRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subCategory", subCategoryRoute);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/application", applicationRoutes);

// HOMEPAGE
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Adhunik BD Homepage</h1>`);
});

// LISTEN
const port = process.env.PORT || 8080;
connectDB();
app.listen(port, () => {
  console.log(`server is running on port ${port}`.cyan.bold);
});
