import express from "express";
import { specs, swaggerUi } from "./config/swagger.js";
import indexRouter from "./routes/index.routes.js";
import logger from "./middlewares/logger.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", indexRouter);

export default app;