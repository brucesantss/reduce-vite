import express from 'express';
import cors from 'cors';

import tasksRouter from './routes/tasksRouter';

const app = express();
const port = 8080;

// settings cors
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST']
}))

// compatibilidade
app.use(express.json());
app.use(tasksRouter);


app.listen(port, () => {
    console.log('servidor status: on-line');
})