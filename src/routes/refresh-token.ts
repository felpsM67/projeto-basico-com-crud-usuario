import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import RefreshTokenController from "../controllers/login/refresh-token";
import { authMiddleware, authorizeRoles } from "../middlewares";

export default (router: Router): void => {
  router.post("/refresh-token",
      adaptRoute(new RefreshTokenController()));
};
