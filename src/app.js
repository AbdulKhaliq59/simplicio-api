import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import Authentication from "./routes/Authentication.js";
const app = express();

app.use(bodyParser.json());
app.use(cors());
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "simplicio APIs documentation",
      version: "1.0.0",
      description: "This is the documentation for APIs simplicio",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `${process.env.URL}`,
      },
    ],
  },
  apis: ["src/**/*doc.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/auth", Authentication);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to simplicio API",
  });
});
export { app };
