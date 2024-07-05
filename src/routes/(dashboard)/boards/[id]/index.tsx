import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetBoard = routeLoader$(
    async ({ params }) => {
        const prisma = new PrismaClient();
        const board = await prisma.board.findUnique({
            where: {
                id: Number(params.id),
            },
        });
        return board;
    },
);

export default component$(() => {
    const board = useGetBoard();
    return (
        <div class="overflow-x-auto flex justify-center items-center min-h-screen">
            <div class="flex space-x-4">
                
            </div>
        </div>
    );
})

export const head: DocumentHead = {
    title: "Cortex | Board",
    meta: [
      {
        name: "description",
        content: "Cortex | The second brain of you company",
      },
    ],
  };