<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="grid grid-cols-2 gap-7">
    <div class="overflow-x-auto space-y-4">
        <div class="text-lg text-center">Cheche</div>
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
                        <td>
                            <a href="/problemas/{p.id}">{p.title}</a>
                        </td>
                        <td>{p.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="overflow-x-auto space-y-4">
        <div class="text-lg text-center">Cheche Creche</div>
    </div>
</div>
