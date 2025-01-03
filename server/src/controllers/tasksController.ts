import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTask = async (req: Request, res: Response) => {

    try {

        const { title, details, status, date } = req.body;

        const convertDate = new Date(date).toISOString();

        const task = await prisma.task.create({
            data: {
                title,
                details,
                status,
                date: convertDate
            }
        })

        if(!task){
            res.status(400).json({ message: 'não foi possivel criar a tarefa.' })
        }

        res.status(201).json({ message: 'tarefa criada!' })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

export const listTasks = async (req: Request, res: Response) => {

    try {

        const task = await prisma.task.findMany();

        if(!task){
            res.status(400).json({ message: 'não foi possivel listar tarefas.' })
        }

        res.status(200).json({ message: task })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}