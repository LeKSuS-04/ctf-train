import { prisma } from "$lib/db";
import { error } from "@sveltejs/kit";
import { formatTime } from "$lib/time";

export async function load({ params }) {
  // Throw 404 if user ID is invalid
  const userId = Number(params.id);
  if (isNaN(userId)) {
    throw error(404);
  }

  // Fetch user from db
  const profile = await prisma.user.findUnique({
    select: {
      username: true,
      fio: true
    },
    where: {
      id: userId
    }
  });
  // Throw 404 if id is valid, but user with such id doesn't exist
  if (profile === null) {
    throw error(404);
  }

  // Fetch solves for this user, sort them from oldest to newest
  const solves = await prisma.solve.findMany({
    select: {
      task: {
        select: {
          id: true,
          name: true,
          cost: true,
          category: true,
          isActive: true
        }
      },
      time: true
    },
    where: {
      userId: userId
    },
    orderBy: {
      time: "asc"
    }
  });

  // Process solves. We need to:
  // 1. Remove solves from deactivated tasks
  // 2. Count total amount of points. Note that we give users points
  //    even for inactive tasks.
  const activeSolves = [];
  let solvedSum = 0;
  solves.forEach(({ task, time }) => {
    solvedSum += task.cost;
    if (task.isActive) {
      activeSolves.push({
        id: task.id,
        name: task.name,
        category: task.category,
        cost: task.cost,
        time: formatTime(time)
      });
    }
  });

  return {
    profile,
    solves: activeSolves,
    solvedSum
  };
}
