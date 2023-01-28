import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

export class GetStatementController{
    async getStatement(req: Request, res: Response){
        const prismaClient = new PrismaClient();
        const {cpf, password} = req.body;

        const client = await prismaClient.client.findFirst({where:{cpf: cpf}});

        if(!client){
            return res.json({message: "Cliente não encontrado"});
        }

        const passwordsMatches = await compare(password, client.password);

        if(!passwordsMatches){
            return res.json({message: "Senha incorreta"});
        }

        const statement = await prismaClient.statement.findMany();

        return res.json({statement});
    }
}