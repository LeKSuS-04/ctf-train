import { prisma } from "$lib/db";

export async function load({ locals }) {
  const contests = await prisma.contest.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      tasks: { select: { taskId: true } }
    },
    where: { isActive: true }
  });

  const solvedIds = (
    await prisma.solve.findMany({
      select: { taskId: true },
      where: { userId: locals.user.id }
    })
  ).map(({ taskId }) => taskId);

  const taskIdToInfo = new Map();
  const allTasks = await prisma.task.findMany({
    select: {
      id: true,
      cost: true
    }
  });
  allTasks.forEach((task) => {
    taskIdToInfo.set(task.id, {
      cost: task.cost,
      isSolved: solvedIds.includes(task.id)
    });
  });

  contests.forEach((contest) => {
    contest.solved = [];
    contest.unsolved = [];
    contest.tasks.forEach((task) => {
      const taskInfo = taskIdToInfo.get(task.taskId);
      if (taskInfo.isSolved) {
        contest.solved.push(taskInfo);
      } else {
        contest.unsolved.push(taskInfo);
      }
    });
    delete contest.tasks;
  });

  return {
    contests
  };
}
