import { Router } from "express";
import { createTask, listTasks } from "../controllers/tasksController";

const router = Router();

router
    .post('/task/create', createTask)
    .get('/tasks', listTasks)

export default router;