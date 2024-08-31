import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

 export const createworkflow = async (req: Request, res: Response) => {
    const { name } = req.body;
   
    try{
        const workflow = await prisma.workFlow.create({
            data: {
                name,
                // @ts-ignore
                userId: req.userId!,
            }
        })
        res.status(200).json({
        message: "workflow has been created"
        })
    }catch(error){
        res.status(400).json({
            message: "something went wrong"
        })
    }
}
export const getwokflow = async (req: Request, res: Response) => {
    try{
        const workflow = await prisma.workFlow.findMany({
            // @ts-ignore
            where: { userId: req.userId! },
            include: { tasks: true },
        })
        res.json({
            workflow
        })
    }catch(error){
        res.status(400).json({
            error: "error fetching workflow"
        })
    }
}