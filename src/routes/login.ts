import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import LoginController from "../controllers/login/login";
import { authMiddleware, authorizeRoles } from "../middlewares";

export default (router: Router): void => {
  router.post("/login",
    adaptRoute(new LoginController()));
};
