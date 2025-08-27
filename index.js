import express from "express";
import userRouter from "./src/routes/user.route.js";
import orderRouter from "./src/routes/order.route.js";
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express()
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});