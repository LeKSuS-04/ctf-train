import { error } from "@sveltejs/kit";
import { authGuard } from "$lib/auth";
import { prisma } from "$lib/db";

export async function load({ params, locals }) {
  authGuard(locals);

  // If contest id isn't valid number, throw 404
  const contestId = Number(params.id);
  if (isNaN(contestId)) {
    throw error(404);
  }

  // If contest doesn't exist or is inactive, throw 404
  const contest = await prisma.contest.findUnique({
    select: { id: true, isActive: true },
    where: { id: contestId }
  });
  if (contest === null || !contest.isActive) {
    throw error(404);
  }

  // Fetch tasks for this contest from db
  const contestTasks = (
    await prisma.ContestsTasks.findMany({
      select: { taskId: true },
      where: {
        contestId: contestId,
        task: { isActive: true }
      }
    })
  ).map(({ taskId }) => taskId);

  // Fetch tasks, solved by current uset and organize them into hashtable
  // for efficient lookup later
  const isSolved = new Set(
    (
      await prisma.solve.findMany({
        select: { taskId: true },
        where: { userId: locals.user.id }
      })
    ).map(({ taskId }) => taskId)
  );

  // Fetch full info about tasks that are in this contest
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
              isAdmin: true,
              isActive: true
            }
          }
        }
      }
    },
    where: {
      id: { in: contestTasks }
    }
  });
  // Count solves for each task and mark it as solved or not by current user
  tasks.forEach((task) => {
    // Don't count admins in solves
    task.solves = task.solves.filter((solve) => !solve.user.isAdmin && solve.user.isActive).length;
    task.isSolved = isSolved.has(task.id);
    delete task._count;
  });

  return { tasks };
}
