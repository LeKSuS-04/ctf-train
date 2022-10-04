import { prisma } from "$lib/db";
import { adminGuard } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

export const actions = {
  create: async ({ locals }) => {
    adminGuard(locals);

    const task = await prisma.contest.create({
      data: {
        name: "Contest"
      }
    });

    throw redirect(303, `/admin/edit-contest/${task.id}`);
  }
};

export async function load({ locals }) {
  adminGuard(locals);

  const contests = await prisma.contest.findMany({
    select: {
      id: true,
      name: true,
      description: true
    }
  });

  return {
    contests
  };
}
