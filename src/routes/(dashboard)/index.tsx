import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, zod$, z, Form } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { clsx } from 'clsx';

export const useCreateBoard = routeAction$(
  async (data) => {
    const prisma = new PrismaClient();
    const board = await prisma.board.create({
      data,
    });
    return board;
  },
  zod$({
    name: z.string().trim().min(1, "name is required"),
  }),
);

export default component$(() => {
  const createBoardAction = useCreateBoard();

  return (
    <section class="flex h-screen w-screen flex-col items-center justify-center">
      <h2 class="capitalize-first text-2xl font-bold">create a new project</h2>
      <Form class="flex flex-col space-y-4 p-4" action={createBoardAction}>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">What is your name?</span>
          </div>
          <input
            name="name"
            type="text"
            class={clsx('input input-bordered w-full max-w-xs', { "input-error": createBoardAction.value?.failed && createBoardAction.value.fieldErrors.name })}
          />
          {createBoardAction.value?.failed && (
            <div class="label" >
              <span class="label-text-alt text-error">
                {createBoardAction.value.fieldErrors.name}
              </span>
            </div>
          )}
        </label>
        <button class="btn btn-primary text-center uppercase" type="submit">
          submit
        </button>
      </Form>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Cortex",
  meta: [
    {
      name: "description",
      content: "Cortex | The second brain of you company",
    },
  ],
};
