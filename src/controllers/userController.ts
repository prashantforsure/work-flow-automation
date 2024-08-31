import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
try {
    const {email, password} = req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedpassword
        }
    })
    res.status(200).json({
        message: "user has been created"
    })
} catch(error){
res.status(400).json({
    message: "something went wrong"
})
}
}

 export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password}  = req.body;
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if(!user || !(bcrypt.compare(password, hashedpassword))){
           return res.status(400).json({
                message: "wrong inputs"
            })
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
          });
        res.status(200).json({
            message: "user has been logged in"
        })
    } catch(error){
        res.status(400).json({
            message: "something went wrong"
        })
    }
}


