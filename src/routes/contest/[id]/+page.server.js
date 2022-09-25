import { error } from "@sveltejs/kit";
import { authGuard } from "$lib/auth";
import { prisma } from "$lib/db";

export async function load({ params, locals }) {
  authGuard(locals);

  const contestId = Number(params.id);
  if (isNaN(contestId)) {
    throw error(404);
  }

  const contest = await prisma.contest.findUnique({
    select: { id: true, isActive: true },
    where: { id: contestId }
  });
  if (contest === null || !contest.isActive) {
    throw error(404);
  }

  const taskIds = (
    await prisma.ContestsTasks.findMany({
      select: { taskId: true },
      where: {
        contestId: contestId,
        task: { isActive: true }
      }
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

  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      cost: true,
      category: true,
      solves: {
        select: {
          user: {
            select: {
              isAdmin: true
            }
          }
        }
      }
    },
    where: {
      id: { in: taskIds }
    }
  });
  tasks.forEach((task) => {
    // Don't count admins in solves
    task.solves = task.solves.filter((solve) => !solve.user.isAdmin).length;
    task.isSolved = isSolved.get(task.id);
    delete task._count;
  });

  return { tasks };
}
