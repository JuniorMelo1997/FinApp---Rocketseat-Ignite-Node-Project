import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import {compare} from "bcrypt";

export class GetBalanceController{
    async getBalance(req: Request, res: Response){
        const {cpf, password} = req.body;
        const prismaClient = new PrismaClient();

        const client = await prismaClient.client.findFirst({where:{cpf: cpf}});

        if(!client){
            return res.json({message: "Usuário não encontrado"});
        }

        const passwordsMatches = compare(password, client.password);

        if(!passwordsMatches){
            return res.status(401).json({message: "Senha incorreta"});
        }

        return res.json({Saldo: client.balance});
    }
}