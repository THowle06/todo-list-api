import express from "express";
import StatusCodes from "http-status-codes";
import { specs, swaggerUi } from "./config/swagger.js";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        "response": "Hello from Todo List API!",
    });
});

export default app;