import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

export class GetClientDataController{
    async getClientData(req: Request, res: Response){
        const prismaClient = new PrismaClient();
        const {cpf, password} = req.body;

        const client = await prismaClient.client.findFirst({where:{
            cpf: cpf
        }})

        if(!client){
            return res.json({message: "Cliente não encontrado"});
        }

        const passwordMatches = await compare(password, client.password);

        if(!passwordMatches){
            return res.json({message: "Senha incorreta"});
        }

        return res.json({
            mensagem: "Dados do cliente",
            id: client.id,
            nome: client.name,
            cpf: client.cpf,
            saldo: client.balance
        })
    }
}