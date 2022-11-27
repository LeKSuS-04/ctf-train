import { error, invalid } from "@sveltejs/kit";
import { prisma } from "$lib/db";
import { authGuard } from "$lib/auth";
import { formatTime } from "$lib/time";

/**
 * Fetches task from database, selecting specified fields. This function ensures that task with
 * specified id exists and is active, or else it will throw 404.
 * @param {String} idString id of task as string
 * @param {Object} selectFields fields to fetch from task
 * @returns task object
 * @throws 404 error if task with specified id doesn't exist or is inactive
 */
async function getTask(idString, selectFields) {
  // If id isn't valid number, thr0w 404
  const taskId = Number(idString);
  if (isNaN(taskId)) {
    throw error(404);
  }

  // Always select .isActive field, because we will need it later
  selectFields.isActive = true;

  // Fetch task from db and throw 404 if it doesn't exist or is inactive
  const task = await prisma.task.findUnique({
    select: selectFields,
    where: {
      id: taskId
    }
  });
  if (task === null || !task.isActive) {
    throw error(404);
  }

  // If .isActive wasn't in selectFields, remove it from object
  if (!selectFields.isActive) {
    delete task.isActive;
  }

  return task;
}

export const actions = {
  // Handle flag submission
  default: async ({ locals, request, params }) => {
    authGuard(locals);

    // Fetch task from database
    const task = await getTask(params.id, {
      id: true,
      flag: true,
      solves: {
        select: {
          userId: true
        }
      }
    });

    // Get flag from request data
    const data = await request.formData();
    const flag = data.get("flag")?.trim();

    // If flag is wrong, return badFlag response
    if (flag !== task.flag) {
      return invalid(418, { badFlag: true });
    }

    // If flag is correct, but current user has already solved this task,
    // return alreadySolved response
    const user = locals.user;
    if (task.solves.some(({ userId }) => userId === user.id)) {
      return invalid(409, { alreadySolved: true });
    }

    // If flag is correct and user hasn't already sovled this task, create
    // new Solve object in db.
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

  // Fetch task from db
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

  // Process fetch task:
  // 1. Check, if task has solve by current user
  // 2. Filter solves and transform them to a more convenient format
  task.isSolved = false;
  const usersSolved = [];
  for (const { userId, time } of task.solves) {
    task.isSolved |= userId === locals.user.id;

    // Fetch user for this solve
    const user = await prisma.user.findUnique({
      select: {
        username: true,
        fio: true,
        isAdmin: true
      },
      where: {
        id: userId
      }
    });

    // Don't show admins and inactive users on the task scoreboard
    if (!user.isAdmin && user.isActive) {
      const userSolve = {
        id: userId,
        username: user.username,
        fio: user.fio,
        time: formatTime(time)
      };
      usersSolved.push(userSolve);
    }
  }

  // We don't need those anymore, all required data is in usersSolved
  delete task.solves;

  return {
    task,
    usersSolved
  };
}
