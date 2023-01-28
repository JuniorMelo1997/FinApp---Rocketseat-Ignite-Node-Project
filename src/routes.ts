import express, { json, Response, Request } from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { GetBalanceController } from "./controllers/GetBalanceController";
import { GetStatementController } from "./controllers/GetStatementController";

const routes = express.Router();

const createClientController = new CreateClientController();
const getBalanceController = new GetBalanceController();
const getStatementController = new GetStatementController();

routes.post("/create", createClientController.createClient);
routes.get("/balance", getBalanceController.getBalance);
routes.get("/statement", getStatementController.getStatement);

export {routes};