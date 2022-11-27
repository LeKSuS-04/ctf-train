import { error, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/db";
import { adminGuard } from "$lib/auth";

/**
 * Fetches task from database, selecting specified fields. This function ensures that task with
 * specified id exists, or else it will throw 404.
 * @param {String} idString id of task as string
 * @returns task object
 * @throws 404 error if task with specified id doesn't exist
 */
async function getTask(idString) {
  // If task id isn't valid number, throw 404
  const taskId = Number(idString);
  if (isNaN(taskId)) {
    throw error(404);
  }

  // Fetch task from db and ensure it exists, otherwise throw 404
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
  // Handle saving/updating task data
  save: async ({ params, request, locals }) => {
    adminGuard(locals);
    
    // Fetch task from db
    const task = await getTask(params.id);

    // Get new task data from form
    const data = await request.formData();
    const taskInfo = {
      name: data.get("name").trim(),
      category: data.get("category").trim(),
      cost: Number(data.get("cost")),
      description: data.get("description").trim(),
      flag: data.get("flag").trim()
    };

    // Update information about task
    await prisma.task.update({
      data: taskInfo,
      where: {
        id: task.id
      }
    });

    return { success: true };
  },

  // Handle activation/deactivation of the task
  toggleActivate: async ({ params, locals }) => {
    adminGuard(locals);
    
    // Fetch task from db
    const task = await getTask(params.id);

    // Update isActive property to opposite value
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

  // Handle deletion of the task
  delete: async ({ params, locals }) => {
    adminGuard(locals);

    // Fetch task from db. This is done to validate task id. This function is
    // used here for consistency with other actions on this route 
    const task = await getTask(params.id);
    
    // Delete task from db
    await prisma.task.delete({
      where: {
        id: task.id
      }
    });

    // This page doesn't exist anymore, since the task was deleted. Redirect to
    // the page with other tasks
    throw redirect(303, "/admin/tasks");
  }
};

export async function load({ locals, params }) {
  adminGuard(locals);

  // Fetch task from db
  const task = await getTask(params.id);

  return {
    task
  };
}
