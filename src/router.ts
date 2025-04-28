import express from "express";
import path from "path";
import bodyParser from "body-parser";

import { churchIncomeRouter } from "./controller/churchIncome";
import { churchIncomeCodeRouter } from "./controller/churchIncomeCode";
import { churchSpendingRouter } from "./controller/churchSpending";
import { churchSpendingCodeRouter } from "./controller/churchSpendingCode";
import { authenticationRouter } from "./controller/authentication";
import { authorizationMiddleware } from "./middleware/authorization";

export const app = express();
var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

//Public Routes
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/authentication", authenticationRouter);
app.get("/api/healthz", (_req, res) => {
  res.send("OK");
});
// Handle requests to "/"
app.get("/", (_req, res) => {
  res.send("Welcome to Express Backend!");
});

//Apply the middleware globally
app.use(authorizationMiddleware);

//Protected Routes
app.use("/api/churchincome", churchIncomeRouter);
app.use("/api/churchincomecode", churchIncomeCodeRouter);
app.use("/api/churchspending", churchSpendingRouter);
app.use("/api/churchspendingcode", churchSpendingCodeRouter);
