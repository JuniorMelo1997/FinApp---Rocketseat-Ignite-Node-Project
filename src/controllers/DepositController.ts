import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

export class DepositController{
    async deposit(req:Request, res:Response){
        const {cpf, password, transaction} = req.body;
        const prismaClient = new PrismaClient();

        const client = await prismaClient.client.findFirst({where:{cpf:cpf}});

        if(!client){
            return res.json({message: "Cliente não encontrado"});
        }

        const passwordMatches = await compare(password, client.password);

        if(!passwordMatches){
            return res.json({message: "Senha incorreta"});
        }

        try {    
            const newBalance = Number(client.balance) + Number(transaction);         
            const updateBalance = await prismaClient.client.update({
                where: {cpf: client.cpf},
                data: {balance: newBalance}
            })

            const statement = await prismaClient.statement.create({
                data:{
                    transaction: Number(transaction),
                    ownerId: client.id
                }
            })

            return res.json(statement);
        } catch (error) {
            console.log(error);
            return res.json({message: "Não foi possível realizar o depósito"});
        }
    }
}