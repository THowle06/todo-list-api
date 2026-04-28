import app from "./app.js";
import { port } from "./config/config.js";

app.listen(port, () => {
    console.log(`Todo List API listening on http://localhost:${port}`);
});