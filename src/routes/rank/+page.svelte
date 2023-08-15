<script lang="ts">
    import type { PageData } from "./$types";

    let checked: boolean;

    export let data: PageData;
</script>

<div class="grid grid-cols-2 mx-10">
    <div class="m-5 text-center card-title card">Intermediário</div>
    <div class="m-5 text-center card-title card">Iniciante</div>
    <div class="flex flex-col w-1/2 m-auto">
        {#each data.interRank as user, i}
            <div >
                {i + 1}.
                {user.username}:
                {user.points}
            </div>
        {/each}
    </div>
    <div class="flex flex-col w-1/2 m-auto">
        {#each data.begginerRank as user, i}
            <div>
                {i + 1}.
                {user.username}:
                {user.points}
            </div>
        {/each}
    </div>
</div>
