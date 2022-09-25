import { prisma } from "$lib/db";
import { error } from "@sveltejs/kit";
import { formatTime } from "$lib/time";

export async function load({ params }) {
  const userId = Number(params.id);
  if (isNaN(userId)) {
    throw error(404);
  }

  const profile = await prisma.user.findUnique({
    select: {
      username: true,
      fio: true
    },
    where: {
      id: userId
    }
  });
  if (profile === null) {
    throw error(404);
  }

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
