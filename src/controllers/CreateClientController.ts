import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import {hash} from "bcrypt";

export class CreateClientController{
    async createClient(req: Request, res: Response){
            const {name, cpf, password} = req.body;

            const prismaClient = new PrismaClient();
            const clientAlreadyExists = await prismaClient.client.findFirst({where:{
                cpf: cpf
            }})

            if(!clientAlreadyExists){
                try {                    
                    const hashedPassword = await hash(password, 8);
                    const client = await prismaClient.client.create({
                        data:{
                            name, cpf, password: hashedPassword, balance: 0
                        }
                    });

                    return res.json({message: `Cliente ${client.name} criado com sucesso`});
                } catch (error) {
                    console.log(error);
                    return res.json({message: "Cannot create a new user client. Try it later"})
                }
            }

            return res.json({message: "Aparentemente este usuário já está cadastrado"});
    }
}