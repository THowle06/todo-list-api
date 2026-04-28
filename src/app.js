import express from "express";
import { specs, swaggerUi } from "./config/swagger.js";
import indexRouter from "./routes/index.routes.js";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", indexRouter);

export default app;