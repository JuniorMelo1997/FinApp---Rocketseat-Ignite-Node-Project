import express, { json, Response, Request } from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { GetBalanceController } from "./controllers/GetBalanceController";

const routes = express.Router();

const createClientController = new CreateClientController();
const getBalanceController = new GetBalanceController();

routes.post("/create", createClientController.createClient);
routes.get("/balance", getBalanceController.getBalance);

export {routes};