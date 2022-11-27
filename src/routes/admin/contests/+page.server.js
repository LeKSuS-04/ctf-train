import { prisma } from "$lib/db";
import { adminGuard } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

export const actions = {
  // Handle creation of new task
  create: async ({ locals }) => {
    adminGuard(locals);

    // Create new contest with dummy title
    const task = await prisma.contest.create({
      data: {
        name: "Contest"
      }
    });

    // Redirect admin to the page with newly created contest
    throw redirect(303, `/admin/edit-contest/${task.id}`);
  }
};

export async function load({ locals }) {
  adminGuard(locals);

  // Fetch all contests from db
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
