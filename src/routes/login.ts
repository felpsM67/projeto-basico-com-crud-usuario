import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import LoginController from "../controllers/login/login";

export default (router: Router): void => {
  router.post("/login",
    adaptRoute(new LoginController()));
};
