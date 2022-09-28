import { adminGuard } from "$lib/auth";
import { prisma } from "$lib/db";

export const actions = {
  toggleRegistration: async({ locals }) => {
    adminGuard(locals);
    
    await prisma.settings.update({
      data: { allowRegistration: !locals.settings.allowRegistration },
      where: { id: 1 }
    });

    return { success: true }
  }
}

export async function load({ locals }) {
  return locals.settings
}