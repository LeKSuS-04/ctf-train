import { adminGuard } from "$lib/auth";
import { prisma } from "$lib/db";
import { redirect } from "@sveltejs/kit";

export const actions = {
  // Handle creation of new task
  create: async ({ locals }) => {
    adminGuard(locals);

    // Create dummy task with some default values
    const task = await prisma.task.create({
      data: {
        name: "Task",
        cost: 0,
        category: "Misc",
        flag: "flag{Ucucucucucuga}"
      }
    });

    // Regirect admin to page, where they can edit newly created task
    throw redirect(303, `/admin/edit-task/${task.id}`);
  }
};

export async function load({ locals }) {
  adminGuard(locals);

  // Fetch information about all tasks from db
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
