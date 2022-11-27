import { prisma } from "$lib/db";
import { authGuard } from "$lib/auth";

export async function load({ locals }) {
  authGuard(locals);

  // Fetch all active contests from db
  const contests = await prisma.contest.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      tasks: { select: { taskId: true } }
    },
    where: { isActive: true }
  });

  // Fetch all solves from current user from db
  const solvedIds = (
    await prisma.solve.findMany({
      select: { taskId: true },
      where: { userId: locals.user.id }
    })
  ).map(({ taskId }) => taskId);

  // Fetch all active tasks from db
  const taskIdToInfo = new Map();
  const allTasks = await prisma.task.findMany({
    select: {
      id: true,
      cost: true,
      isActive: true
    }
  });
  // Map taks ids to information about that task
  allTasks.forEach((task) => {
    taskIdToInfo.set(task.id, {
      cost: task.cost,
      isActive: task.isActive,
      isSolved: solvedIds.includes(task.id)
    });
  });

  // For each contest, iterate over its tasks and sort them either into
  // .solved[] or .unsolved[]
  contests.forEach((contest) => {
    // Add properties to contest object
    contest.solved = [];
    contest.unsolved = [];

    contest.tasks.forEach((task) => {
      // Get task information from our mapping
      const taskInfo = taskIdToInfo.get(task.taskId);

      // Don't count task if it is inactive
      if (!taskInfo.isActive) return;

      // Push task into one of two arrays
      if (taskInfo.isSolved) {
        contest.solved.push(taskInfo);
      } else {
        contest.unsolved.push(taskInfo);
      }
    });

    // We don't need it anymore
    delete contest.tasks;
  });

  return {
    contests
  };
}
