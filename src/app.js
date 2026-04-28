import express from "express";
import StatusCodes from "http-status-codes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        "response": "Hello from Todo List API!",
    });
});

export default app;