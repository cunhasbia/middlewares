import { Router } from "express";

import GrowdeverController from "./app/controllers/GrowdeverController";

import logRequestsMiddleware from "./app/middlewares/logRequests";
import validateIdParamMiddleware from "./app/middlewares/validateIdParam";
import findGrowdeverIdMiddleware from "./app/middlewares/findGrowdeverId";
import validateTokenMiddleware from "./app/middlewares/validateToken";

const routes = new Router();

routes.use(logRequestsMiddleware);
routes.use("/growdevers/:id", validateIdParamMiddleware, findGrowdeverIdMiddleware);
routes.use("/login/:token", validateTokenMiddleware);

routes.get("/growdevers", GrowdeverController.index);
routes.get("/growdevers/:id", GrowdeverController.show);
routes.get("/login/:token", GrowdeverController.showLogin);
routes.post("/growdevers", GrowdeverController.store);
routes.post("/login", GrowdeverController.login);
routes.put("/growdevers/:id", GrowdeverController.update);
routes.delete('/growdevers/:id', GrowdeverController.delete);

export default routes;
