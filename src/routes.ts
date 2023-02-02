import express from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { GetBalanceController } from "./controllers/GetBalanceController";
import { GetStatementController } from "./controllers/GetStatementController";
import { DepositController } from "./controllers/DepositController";

const routes = express.Router();

const createClientController = new CreateClientController();
const getBalanceController = new GetBalanceController();
const getStatementController = new GetStatementController();
const depositController = new DepositController();

routes.post("/create", createClientController.createClient);
routes.get("/balance", getBalanceController.getBalance);
routes.get("/statement", getStatementController.getStatement);
routes.post("/deposit", depositController.deposit);

export {routes};