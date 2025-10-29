import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";
import { resolveRuntimePath } from './paths';

// Carregar o arquivo YAML
const swaggerFile = resolveRuntimePath('docs/api/swagger.yaml');
const swaggerDocument = YAML.load(swaggerFile);

const app = express();
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});
// Configurar o Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

setupMiddlewares(app);
setupRoutes(app);
export default app;
