import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

// Carregar o arquivo YAML
const swaggerDocument = yaml.load(
  path.resolve(__dirname, "..","docs", "api", "swagger.yaml")
);

const app = express();
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});
// Configurar o Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

setupMiddlewares(app);
setupRoutes(app);
export default app;
