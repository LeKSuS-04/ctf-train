import { prisma } from "$lib/db";

export async function load() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fio: true
    },
    where: {
      isAdmin: false
    }
  });

  const solves = await prisma.solve.findMany({
    select: {
      userId: true,
      task: {
        select: {
          cost: true
        }
      }
    }
  });

  const idsToUsers = new Map();
  users.forEach((user) => {
    user.score = 0;
    idsToUsers.set(user.id, user);
  });

  solves.forEach((solve) => {
    if (idsToUsers.get(solve.userId)) {
      idsToUsers.get(solve.userId).score += solve.task.cost;
    }
  });

  users.sort((a, b) => b.score - a.score);

  return {
    users
  };
}
