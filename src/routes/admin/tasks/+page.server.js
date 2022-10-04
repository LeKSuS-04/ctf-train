import { adminGuard } from "$lib/auth";
import { prisma } from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const actions = {
  create: async ({ locals }) => {
    adminGuard(locals);

    const task = await prisma.task.create({
      data: {
        name: "Task",
        cost: 0,
        category: "Misc",
        flag: "flag{Ucucucucucuga}"
      }
    });

    throw redirect(303, `/admin/edit-task/${task.id}`);
  }
};

export async function load({ locals }) {
  adminGuard(locals);

  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      cost: true,
      category: true,
      description: true,
      flag: true
    }
  });

  return {
    tasks
  };
}
