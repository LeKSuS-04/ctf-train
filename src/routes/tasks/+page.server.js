import { prisma } from "$lib/db";
import { authGuard } from "$lib/auth";

export async function load({ locals }) {
  authGuard(locals);

  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      cost: true,
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
    }
  });

  const userId = locals.user.id;
  for (const task of tasks) {
    task.isSolved = task.solves.map(({ user }) => user.id).includes(userId);
    task.solves = task.solves.filter((solve) => !solve.user.isAdmin).length;
  }

  return { tasks };
}
