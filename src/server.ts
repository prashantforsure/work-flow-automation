import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import workflowRoutes from './routes/workflowRoutes'

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use("/api/workflow", workflowRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
