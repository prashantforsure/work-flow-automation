import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const createTask = async (req: Request, res: Response) => {
const { name, description, workFlowId, triggerDetails, triggerType } = req.body;
try{
    const task = await prisma.task.create({
        data: {
            name,
            description,
            workFlowId,
            triggerType,
                triggerDetails
        }
    })
    res.status(200).json({
        message: "task has been created"
    })
}catch(error){
    res.status(400).json({
        message: " something went wrong"
    })
}
}

export const getTasks = async (req: Request, res: Response) => {
    const { workFlowId } = req.params
    try {
        const task = await prisma.task.findMany({
            where:{
                workFlowId: parseInt(workFlowId)
            }
        })
        res.status(200).json({
            task
        })
    }catch(error){
        res.status(400).json({
            message: "cant the fetch the tasks"
        })
    }
}

export const updateTask = async ( req: Request, res: Response) => {
    const { taskId } = req.params;
    const { name , description, triggerDetails, triggerType } = req.body
    try{
        const update = await prisma.task.update({
            where: {
                id : parseInt(taskId)
            }, 
            data :{
                name,
                description, 
                triggerType,
                triggerDetails,
            }
        })
        res.json({
            update
        })
    } catch(error){
        res.status(400).json({
            error : "task has not been updated"
        })
    }
}

export const deleteTask = async ( req: Request, res: Response) => {
    const { taskId } = req.params;
    try{
        const deletetask = await prisma.task.delete({
            where: {
                id : parseInt(taskId)
            }
        })
        res.json({
            message: " the task has been deleted"
        }, )
    } catch(error){
        res.status(400).json({
            error: " something went wrong"
        })
    }
}