import { error, invalid } from "@sveltejs/kit";
import { prisma } from "$lib/db";
import { authGuard } from "$lib/auth";

async function getTask(idString, selectFields) {
  const taskId = Number(idString);
  if (isNaN(taskId)) {
    throw error(404);
  }

  const task = await prisma.task.findUnique({
    select: selectFields,
    where: {
      id: taskId
    }
  });
  if (task === null) {
    throw error(404);
  }

  return task;
}

export const actions = {
  default: async ({ locals, request, params }) => {
    authGuard(locals);

    const task = await getTask(params.id, {
      id: true,
      flag: true,
      solves: {
        select: {
          userId: true
        }
      }
    });

    const data = await request.formData();
    const flag = data.get("flag");

    if (flag !== task.flag) {
      return invalid(418, { badFlag: true });
    }

    const user = locals.user;
    if (task.solves.some(({ userId }) => userId === user.id)) {
      return invalid(409, { alreadySolved: true });
    }

    await prisma.solve.create({
      data: {
        userId: user.id,
        taskId: task.id
      }
    });

    return { success: true };
  }
};

export async function load({ params, locals }) {
  authGuard(locals);

  const task = await getTask(params.id, {
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
  });

  task.isSolved = false;

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
      id: userId,
      username: user.username,
      fio: user.fio,
      time: time.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    };
    usersSolved.push(userSolve);
    task.isSolved |= userId === locals.user.id;
  }
  delete task.solves;

  return {
    task,
    usersSolved
  };
}
