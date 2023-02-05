import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { Request, Response } from "express";


export class DropClientController{
    async dropClient(req: Request, res: Response){
        const prismaClient = new PrismaClient();
        const {cpf, password} = req.body;

        const client = await prismaClient.client.findFirst({where:{
            cpf: cpf
        }});

        if(!client){
            return res.json({message: "Usuário não encontrado"});
        }

        const passwordMatches = compare(password, client.password);

        if(!passwordMatches){
            return res.json({message: "Senha incorreta"});
        }

        try {                   
            await prismaClient.client.delete({where:{cpf: cpf}});
            
            return res.json({message: "Cliente deletado com sucesso"});
        } catch (error) {
            return res.json({message: "Não foi possível excluir o cliente"})
        }
    }
}