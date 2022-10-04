import { error, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/db";
import { adminGuard } from "$lib/auth";

async function getTask(idString) {
  const taskId = Number(idString);
  if (isNaN(taskId)) {
    throw error(404);
  }

  const task = await prisma.task.findUnique({
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
  save: async ({ params, request, locals }) => {
    adminGuard(locals);
    const task = await getTask(params.id);

    const data = await request.formData();
    const taskInfo = {
      name: data.get("name"),
      category: data.get("category"),
      cost: Number(data.get("cost")),
      description: data.get("description"),
      flag: data.get("flag")
    };

    await prisma.task.update({
      data: taskInfo,
      where: {
        id: task.id
      }
    });

    return { success: true };
  },

  toggleActivate: async ({ params, locals }) => {
    adminGuard(locals);
    const task = await getTask(params.id);

    await prisma.task.update({
      data: {
        isActive: !task.isActive
      },
      where: {
        id: task.id
      }
    });

    return { success: true };
  },

  delete: async ({ params, locals }) => {
    adminGuard(locals);
    const task = await getTask(params.id);

    await prisma.task.delete({
      where: {
        id: task.id
      }
    });

    throw redirect(303, "/admin/tasks");
  }
};

export async function load({ locals, params }) {
  adminGuard(locals);
  const task = await getTask(params.id);

  return {
    task
  };
}
