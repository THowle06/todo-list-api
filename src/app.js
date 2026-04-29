import express from "express";
import { specs, swaggerUi } from "./config/swagger.js";
import indexRouter from "./routes/index.routes.js";
import healthRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todo.routes.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", indexRouter);
app.use("/health", healthRouter);
app.use("/", authRouter);
app.use("/", todoRouter);

app.use(notFound);
app.use(errorHandler);

export default app;