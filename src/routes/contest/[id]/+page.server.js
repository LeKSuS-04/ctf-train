import { error } from "@sveltejs/kit";
import { prisma } from "$lib/db";

export async function load({ params, locals }) {
  const contestId = Number(params.id);
  if (isNaN(contestId)) {
    throw error(404);
  }

  const contest = await prisma.contest.findUnique({
    select: { id: true },
    where: { id: contestId }
  });
  if (contest === null) {
    throw error(404);
  }

  const taskIds = (
    await prisma.ContestsTasks.findMany({
      select: { taskId: true },
      where: { contestId: contestId }
    })
  ).map(({ taskId }) => taskId);

  const solvedTasks = (
    await prisma.solve.findMany({
      select: { taskId: true },
      where: { userId: locals.user.id }
    })
  ).map(({ taskId }) => taskId);
  let isSolved = new Map();
  solvedTasks.forEach((taskId) => isSolved.set(taskId, true));

  let tasks = await prisma.task.findMany({
    select: {
      _count: { select: { solves: true } },
      id: true,
      name: true,
      cost: true,
      category: true
    },
    where: {
      id: { in: taskIds }
    }
  });

  tasks.forEach((task) => {
    task.solves = task._count.solves;
    task.isSolved = isSolved.get(task.id);
    delete task._count;
  });

  return { tasks };
}
