import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const runAutomations = async () => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: 'pending',
        triggerType: {
          not: null,
        },
      },
    });

    for (const task of tasks) {
      // Example: Trigger based on time
      if (task.triggerType === 'time' && new Date(task.triggerDetails!) <= new Date()) {
        // Execute the task (e.g., change status)
        await prisma.task.update({
          where: { id: task.id },
          data: { status: 'completed' },
        });
        console.log(`Task ${task.name} executed successfully`);
      }

      // Add more trigger types as needed
    }
  } catch (error) {
    console.error('Error running automations:', error);
  }
};

// Schedule to run every minute (for example)
setInterval(runAutomations, 60000);
