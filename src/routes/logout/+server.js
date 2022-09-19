import { redirect } from "@sveltejs/kit";

export function POST({ cookies }) {
  cookies.delete("session");
  throw redirect(303, "/");
}
