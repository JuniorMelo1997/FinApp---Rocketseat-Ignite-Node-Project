import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

export class DepositWithdrawController{

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
                    ownerId: client.id,
                    date: dd+"/"+mm+"/"+yyyy
                }
            })

            return res.json(statement);
        } catch (error) {
            console.log(error);
            return res.json({message: "Não foi possível realizar o depósito"});
        }
    }

    async withdraw(req:Request, res:Response){
        const {cpf, password, transaction} = req.body;
        const prismaClient = new PrismaClient();

        const withdrawVal = transaction*(-1);
        const client = await prismaClient.client.findFirst({where:{cpf:cpf}});

        if(!client){
            return res.json({message: "Cliente não encontrado"});
        }

        const passwordMatches = await compare(password, client.password);

        if(!passwordMatches){
            return res.json({message: "Senha incorreta"});
        }

        try {
             if(transaction > client.balance){
                return res.json({message: "Saldo insuficiente para realizar o saque"})
             }

                                
             const newBalance = Number(client.balance) + Number(withdrawVal);         
             const updateBalance = await prismaClient.client.update({
                 where: {cpf: client.cpf},
                 data: {balance: newBalance}
             })

             const statement = await prismaClient.statement.create({
                 data:{
                     transaction: Number(withdrawVal),
                     ownerId: client.id,
                     date: dd+"/"+mm+"/"+yyyy
                 }
             })

             return res.json(statement);
        } catch (error) {
            console.log(error);
            return res.json({message: "Não foi possível realizar o depósito"});
        }
    }
}