import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { format } from 'date-fns';

export const useGetBoards = routeLoader$(
    async () => {
        const prisma = new PrismaClient();
        const boards = await prisma.board.findMany();
        return boards;
    },
)

export default component$(() => {
    const boards = useGetBoards();
    return (
        <div class="flex h-screen w-screen justify-center items-center overflow-x-auto">
            <table class="table container bg-neutral shadow-lg text-primary-content">
            
                <thead>
                <tr>
                    <th></th>
                    <th class="font-bold capitalize">name</th>
                    <th class="font-bold capitalize">created at</th>
                </tr>
                </thead>
                <tbody>
                    {boards.value.map((board) => (
                        <tr key={`board-${board.id}`} class="hover cursor-pointer">
                            <th>{board.id}</th>
                            <td>{board.name}</td>
                            <td>{format(new Date(board.createdAt), 'dd/MM/yyyy')}</td>
                        </tr>
                    ))}
            
                </tbody>
            </table>
            </div>
    );
});

export const head: DocumentHead = {
    title: "Cortex | Boards",
    meta: [
      {
        name: "description",
        content: "Cortex | The second brain of you company",
      },
    ],
  };
  