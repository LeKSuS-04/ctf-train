import { prisma } from "$lib/db";
import { authGuard } from "$lib/auth";

export async function load({ locals }) {
  authGuard(locals);

  // Fetch tasks from db, sort from newest to oldest.
  // We can sort by id here, since new tasks always have bigger ids than old.
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      cost: true,
      category: true,
      description: true,
      solves: {
        select: {
          user: {
            select: {
              id: true
            }
          }
        }
      }
    },
    where: {
      isActive: true
    },
    orderBy: {
      id: "desc"
    }
  });

  // Process fetched tasks:
  // 1. Mark each as solved or unsolved by current user
  // 2. Count total amount of solves for each task
  const userId = locals.user.id;
  for (const task of tasks) {
    task.isSolved = task.solves.map(({ user }) => user.id).includes(userId);
    task.solves = task.solves.filter((solve) => !solve.user.isAdmin).length;
  }

  return { tasks };
}
