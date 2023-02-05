import express from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { GetBalanceController } from "./controllers/GetBalanceController";
import { GetStatementController } from "./controllers/GetStatementController";
import { DepositWithdrawController } from "./controllers/DepositWithdrawController";
import { UpdateClientDataController } from "./controllers/UpdateClientDataController";
import { GetClientDataController } from "./controllers/GetClientDataController";

const routes = express.Router();

const createClientController = new CreateClientController();
const getBalanceController = new GetBalanceController();
const getStatementController = new GetStatementController();
const depositWithdrawController = new DepositWithdrawController();
const updateClientDataController = new UpdateClientDataController();
const getClientDataController = new GetClientDataController();

routes.post("/create", createClientController.createClient);
routes.get("/balance", getBalanceController.getBalance);
routes.get("/statement", getStatementController.getStatement);
routes.post("/deposit", depositWithdrawController.deposit);
routes.post("/withdraw", depositWithdrawController.withdraw);
routes.post("/client/update", updateClientDataController.updateClientData);
routes.get("/client/data", getClientDataController.getClientData);

export {routes};