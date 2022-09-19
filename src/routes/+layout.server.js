export const ssr = true;

export function load({ locals }) {
  return {
    user: locals.user
  };
}
