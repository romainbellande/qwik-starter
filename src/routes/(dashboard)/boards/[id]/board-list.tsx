import { component$ } from "@builder.io/qwik";

interface Props {
    name: string
}

export const BoardList = component$<Props>(({ name }) => {
    return (
        <div class="board-list card shadow-xl px-2 py-4 rounded-xl bg-slate-900 text-white w-64 min-h-64 space-y-4">
            <div class="flex justify-between">
                <div>{name}</div>
            </div>
        </div>
    );
})