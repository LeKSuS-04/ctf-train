import { prisma } from "$lib/db";
import { adminGuard } from "$lib/auth";
import { error, redirect } from "@sveltejs/kit";

async function getContest(idString, fetchTasks = false) {
  const contestId = Number(idString);
  if (isNaN(contestId)) {
    throw error(404);
  }

  const contest = await prisma.contest.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      isActive: true,
      tasks: {
        select: {
          taskId: true
        }
      }
    },
    where: { id: contestId }
  });
  if (contest === null) {
    throw error(404);
  }

  if (fetchTasks) {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        category: true,
        cost: true,
        name: true,
        description: true,
        flag: true,
        isActive: true
      },
      where: {
        id: { in: contest.tasks.map(({ taskId }) => taskId) }
      }
    });
    contest.tasks = tasks;
  } else {
    contest.tasks = undefined;
  }

  return contest;
}

export const actions = {
  save: async ({ params, request, locals }) => {
    adminGuard(locals);
    const contest = await getContest(params.id);

    const data = await request.formData();
    const contestInfo = {
      name: data.get("name"),
      description: data.get("description")
    };

    await prisma.contest.update({
      data: contestInfo,
      where: { id: contest.id }
    });

    return { sucess: true };
  },

  toggleActivate: async ({ params, locals }) => {
    adminGuard(locals);
    const contest = await getContest(params.id);

    await prisma.contest.update({
      data: { isActive: !contest.isActive },
      where: { id: contest.id }
    });

    return { success: true };
  },

  toggleActivateWithTasks: async ({ params, locals }) => {
    adminGuard(locals);
    const contest = await getContest(params.id, true);

    await prisma.contest.update({
      data: { isActive: !contest.isActive },
      where: { id: contest.id }
    });

    await prisma.task.updateMany({
      data: { isActive: !contest.isActive },
      where: {
        id: {
          in: contest.tasks.map(({ id }) => id)
        }
      }
    });

    return { success: true };
  },

  delete: async ({ params, locals }) => {
    adminGuard(locals);
    const contest = await getContest(params.id);

    await prisma.contest.delete({
      where: { id: contest.id }
    });

    throw redirect(303, "/admin/contests");
  },

  deleteWithTasks: async ({ params, locals }) => {
    adminGuard(locals);
    const contest = await getContest(params.id, true);

    await prisma.task.deleteMany({
      where: {
        id: {
          in: contest.tasks.map(({ id }) => id)
        }
      }
    });

    await prisma.contest.delete({
      where: { id: contest.id }
    });

    throw redirect(303, "/admin/contests");
  },

  removeTask: async ({ params, request, locals }) => {
    adminGuard(locals);
    const contest = await getContest(params.id, true);

    const data = await request.formData();
    const taskId = Number(data.get("id"));

    await prisma.ContestsTasks.delete({
      where: {
        contestId_taskId: {
          taskId: taskId,
          contestId: contest.id
        }
      }
    });
    return { success: true };
  },

  addTask: async ({ params, request, locals }) => {
    adminGuard(locals);
    const contest = await getContest(params.id, true);

    const data = await request.formData();
    const taskId = Number(data.get("id"));

    const task = await prisma.task.findUnique({
      select: { id: true },
      where: { id: taskId }
    });

    if (task !== null && !contest.tasks.map(({ id }) => id).includes(taskId)) {
      await prisma.ContestsTasks.create({
        data: {
          contestId: contest.id,
          taskId: taskId
        }
      });
    }

    return { success: true };
  }
};

export async function load({ params, locals }) {
  adminGuard(locals);

  const contest = await getContest(params.id, true);
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      cost: true,
      description: true
    },
    where: {
      id: {
        notIn: contest.tasks.map(({ id }) => id)
      }
    }
  });

  return {
    contest,
    tasks
  };
}
