import { prisma } from "$lib/db";

export async function load() {
  // Fetch all non-admin active users from database
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fio: true
    },
    where: {
      isAdmin: false,
      isActive: true
    }
  });

  // Fetch solves far all users
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

  // Map user ids to user information
  const idsToUsers = new Map();
  users.forEach((user) => {
    user.score = 0;
    idsToUsers.set(user.id, user);
  });

  // For each solve, add it's value to user information 
  solves.forEach((solve) => {
    if (idsToUsers.has(solve.userId)) {
      idsToUsers.get(solve.userId).score += solve.task.cost;
    }
  });

  // Sort users from highest score to lowest
  users.sort((a, b) => b.score - a.score);

  return {
    users
  };
}
