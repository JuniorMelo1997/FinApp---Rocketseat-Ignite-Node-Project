import express, { json, Response, Request } from "express";
import { CreateClientController } from "./controllers/CreateClientController";

const routes = express.Router();

const createClientController = new CreateClientController();

routes.post("/create", createClientController.createClient);

export {routes};