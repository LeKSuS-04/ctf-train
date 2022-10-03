import { adminGuard } from "$lib/auth";

export async function load({ locals }) {
  adminGuard(locals);
}
