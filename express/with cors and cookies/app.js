import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
import graphData from "./data.json" assert { type: "json" };
import { mainRouter } from "./routes/mainRouter.js";
import { User } from "./models/User.js";
import cookieParser from "cookie-parser";

const dbUrl =
  "mongodb+srv://chlen:Hilaryhil20@cluster0.xjmnabe.mongodb.net/peaska?retryWrites=true&w=majority";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // use your actual domain name (or localhost), using * is not recommended
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    // allowedHeaders: [
    //   "Content-Type",
    //   "Origin",
    //   "X-Requested-With",
    //   "Accept",
    //   "x-client-key",
    //   "x-client-token",
    //   "x-client-secret",
    //   "Authorization",
    //   "Access-Control-Allow-Origin"
    // ],
    credentials: true,
  }),
  express.json(),
  cookieParser()
);

app.use(mainRouter);

try {
  await mongoose.connect(dbUrl);
  app.listen(4444, console.log("Server is up"));
} catch (error) {
  console.log(error);
}
