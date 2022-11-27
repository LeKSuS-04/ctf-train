import { prisma } from "$lib/db";
import { adminGuard } from "$lib/auth";
import { error, redirect } from "@sveltejs/kit";

async function getContest(idString, fetchTasks = false) {
  // If id isn't valid number, throw 404
  const contestId = Number(idString);
  if (isNaN(contestId)) {
    throw error(404);
  }

  // Fetch contest from db with all fields and ensure it exists, otherwise throw 404
  const contest = await prisma.contest.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      isActive: true,
      tasks: {
        select: {
          taskId: true
        }
      }
    },
    where: { id: contestId }
  });
  if (contest === null) {
    throw error(404);
  }

  // If tasks for contest need to be fetched, fetch them
  if (fetchTasks) {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        category: true,
        cost: true,
        name: true,
        description: true,
        flag: true,
        isActive: true
      },
      where: {
        id: { in: contest.tasks.map(({ taskId }) => taskId) }
      }
    });
    contest.tasks = tasks;
  } else {
    contest.tasks = undefined;
  }

  return contest;
}

export const actions = {
  // Handle saving/updating contest information
  save: async ({ params, request, locals }) => {
    adminGuard(locals);

    // Fetch contest from database
    const contest = await getContest(params.id);

    // Get new contest data from form
    const data = await request.formData();
    const contestInfo = {
      name: data.get("name"),
      description: data.get("description")
    };

    // Update database record
    await prisma.contest.update({
      data: contestInfo,
      where: { id: contest.id }
    });

    return { sucess: true };
  },

  // Handle activation/deactivation of the contest
  toggleActivate: async ({ params, locals }) => {
    adminGuard(locals);

    // Fetch contest from database
    const contest = await getContest(params.id);

    // Set contest isActive value to opposite one
    await prisma.contest.update({
      data: { isActive: !contest.isActive },
      where: { id: contest.id }
    });

    return { success: true };
  },

  // Handle activation/deactivation of the contest with all tasks
  toggleActivateWithTasks: async ({ params, locals }) => {
    adminGuard(locals);

    // Fetch contest and all tasks from it
    const contest = await getContest(params.id, true);

    // Set contest isActive value to opposite one
    await prisma.contest.update({
      data: { isActive: !contest.isActive },
      where: { id: contest.id }
    });

    // For each task from this contest, set it's isActive value to the same
    // as the for contest
    await prisma.task.updateMany({
      data: { isActive: !contest.isActive },
      where: {
        id: {
          in: contest.tasks.map(({ id }) => id)
        }
      }
    });

    return { success: true };
  },

  // Handle deletion of the contest
  delete: async ({ params, locals }) => {
    adminGuard(locals);

    // Fetch contest from db
    const contest = await getContest(params.id);

    // Delete record from database
    await prisma.contest.delete({
      where: { id: contest.id }
    });

    // Contest no longer exists, redirect admin to the page with all other contests
    throw redirect(303, "/admin/contests");
  },

  // Handle deletion of the contest with all tasks
  deleteWithTasks: async ({ params, locals }) => {
    adminGuard(locals);

    // Fetch contest from db
    const contest = await getContest(params.id, true);

    // Delete all tasks, which are in this contest
    await prisma.task.deleteMany({
      where: {
        id: {
          in: contest.tasks.map(({ id }) => id)
        }
      }
    });

    // Delete the contest itself
    await prisma.contest.delete({
      where: { id: contest.id }
    });

    // Contest no longer exists, redirect admin to the page with all other contests
    throw redirect(303, "/admin/contests");
  },

  // Handle removing task from the contest
  removeTask: async ({ params, request, locals }) => {
    adminGuard(locals);

    // Get contest from the db
    const contest = await getContest(params.id, true);

    // Get task id from form data
    const data = await request.formData();
    const taskId = Number(data.get("id"));

    // Remove contest-to-task connection for this contest and this task
    await prisma.ContestsTasks.delete({
      where: {
        contestId_taskId: {
          taskId: taskId,
          contestId: contest.id
        }
      }
    });
    return { success: true };
  },

  // Handle adding new task to the contest
  addTask: async ({ params, request, locals }) => {
    adminGuard(locals);

    // Get contest from database
    const contest = await getContest(params.id, true);

    // Get task id form form data
    const data = await request.formData();
    const taskId = Number(data.get("id"));

    // Fetch task from database
    const task = await prisma.task.findUnique({
      select: { id: true },
      where: { id: taskId }
    });

    // If task with such id exists and isn't in this contest yet, add it
    if (task !== null && !contest.tasks.map(({ id }) => id).includes(taskId)) {
      await prisma.ContestsTasks.create({
        data: {
          contestId: contest.id,
          taskId: taskId
        }
      });
    }

    return { success: true };
  }
};

export async function load({ params, locals }) {
  adminGuard(locals);

  // Fetch contest and information about all tasks from database
  // Information about all other tasks is needed to allow convenient addition
  // of new tasks to the contest
  const contest = await getContest(params.id, true);
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      cost: true,
      description: true
    },
    where: {
      id: {
        notIn: contest.tasks.map(({ id }) => id)
      }
    }
  });

  return {
    contest,
    tasks
  };
}
