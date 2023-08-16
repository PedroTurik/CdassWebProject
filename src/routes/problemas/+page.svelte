<script lang="ts">
    import AdminCheck from "$lib/components/AdminCheck.svelte";
    import OpenModel from "$lib/components/OpenModel.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<div class="grid grid-cols-2 gap-7">
    <div class="overflow-x-auto space-y-4">
        <div class="text-lg text-center">Intermediário</div>
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th />
                    <th>Desafio</th>
                    <th>Pontos</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                {#each data.problems as p}
                    <tr>
                        <th>{p.id}</th>
                        <a href="/problemas/{p.id}">
                            <td class="hover:bg-base-200">
                                {p.title}
                            </td>
                        </a>
                        <td>{p.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="overflow-x-auto space-y-4">
        <div class="text-lg text-center">Iniciante</div>
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th />
                    <th>Desafio</th>
                    <th>Pontos</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                {#each data.begginerProblems as p}
                    <tr>
                        <th>{p.id}</th>
                        <a href="/problemas/{p.id}">
                            <td class="hover:bg-base-200">
                                {p.title}
                            </td>
                        </a>
                        <td>{p.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<div class="w-1/2 m-auto text-center pt-10">
    <AdminCheck>
        <OpenModel modelText="Novo Problema">
            <form class="space-y-5" method="POST">
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    class="input input-bordered w-full input-success"
                />

                <textarea
                    name="text"
                    class="textarea textarea-secondary"
                    cols="50"
                    placeholder="text"
                />
                <textarea
                    name="input"
                    class="textarea textarea-secondary"
                    cols="50"
                    placeholder="input"
                />
                <div class="form-control text-right">
                    <label class="cursor-pointer label ml-auto">
                        <span class="label-text pr-4">Iniciante</span>
                        <input
                            name="begginer-check"
                            type="checkbox"
                            class="checkbox checkbox-secondary"
                        />
                    </label>
                </div>

                <input
                    name="answer"
                    type="text"
                    placeholder="Answer"
                    class="input input-bordered w-full input-success"
                />

                <div class="my-4 min-h-16 px-8 w-full">
                    <button class="btn btn-success">
                        enviar novo problema
                    </button>
                </div>
            </form>
        </OpenModel>
    </AdminCheck>
</div>
