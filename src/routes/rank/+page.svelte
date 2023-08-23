<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="flex w-full mt-5">
    <div class="card w-1/2 m-10 bg-base-200 shadow-xl">
        <div class="card-body">
            <h2 class="card-title m-auto">Avançado</h2>

            <div class="flex flex-col w-1/2 m-auto">
                {#each data.advancedRank as user, i}
                    <div>
                        {i + 1}.
                        {user.username}:
                        {user.chad_points}
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="divider divider-horizontal" />
    <div class="card w-1/2 m-10 bg-base-200 shadow-xl">
        <div class="card-body">
            <h2 class="card-title mx-auto">Normal</h2>
            <div class="flex flex-col w-1/2 mx-auto">
                {#each data.begginerRank as user, i}
                    <div>
                        {i + 1}.
                        {user.username}:
                        {user.points}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
