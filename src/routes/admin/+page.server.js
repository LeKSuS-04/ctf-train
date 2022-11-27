import { adminGuard } from "$lib/auth";
import { prisma } from "$lib/db";

export const actions = {
  // Handle enabling/disabling registration of new users
  toggleRegistration: async ({ locals }) => {
    adminGuard(locals);

    // Change value in the settings to the opposite
    await prisma.settings.update({
      data: { allowRegistration: !locals.settings.allowRegistration },
      where: { id: 1 }
    });

    return { success: true };
  }
};

export async function load({ locals }) {
  return locals.settings;
}
