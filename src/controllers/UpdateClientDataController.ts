import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

export class UpdateClientDataController{
    async updateClientData(req: Request, res: Response){
        const prismaClient = new PrismaClient();
        const {name, cpf, newCpf, password, newPassword, balance} = req.body;

        const client = await prismaClient.client.findFirst({where:{
            cpf: cpf
        }});

        if(!client){
            return res.json({message: "CPF não cadastrado"});
        }

        const passwordsMatches = compare(password, client.password);

        if(!passwordsMatches){
            return res.json({message: "Senha incorreta"});
        }

        try {
            const hashedPassword = await hash(newPassword, 8);
            const clientUpdated = await prismaClient.client.update({
                where:{
                    cpf: client.cpf
                },
                data:{
                    name: name,
                    password: hashedPassword,
                    balance: balance
                }
            })

            return res.json({message: "Dados do cliente atualizados com sucesso"});
        } catch (error) {
            return res.json({message: "Não foi possível atualizar os dados do cliente"});
        }

    }
}