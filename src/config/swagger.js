import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo List API",
            version: "1.0.0",
            description: "A RESTful API to allow users to manage their to-do list.",
        },
    },
    apis: ["../routes/*.js"],
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };