import { error } from "@sveltejs/kit";
import { prisma } from "$lib/db";

export async function load({ params }) {
  const taskId = Number(params.id);
  if (isNaN(taskId)) {
    throw error(404);
  }

  const task = await prisma.task.findUnique({
    select: {
      name: true,
      cost: true,
      description: true,
      category: true,
      solves: {
        select: {
          userId: true,
          time: true
        }
      }
    },
    where: {
      id: taskId
    }
  });
  if (task === null) {
    throw error(404);
  }

  const usersSolved = [];
  for (const { userId, time } of task.solves) {
    const user = await prisma.user.findUnique({
      select: {
        username: true,
        fio: true
      },
      where: {
        id: userId
      }
    });
    const userSolve = {
      username: user.username,
      fio: user.fio,
      time: time.toLocaleString("ru-RU", { timeZone: "UTC" })
    };
    usersSolved.push(userSolve);
  }
  delete task.solves;

  return {
    task,
    usersSolved
  };
}
