<script lang="ts">
    import type { PageData } from "./$types";

    let checked = false;

    export let data: PageData;
    let curRank: UserData[];
    $: if (checked) {
        curRank = data.interRank;
    } else {
        curRank = data.begginerRank;
    }
</script>

<div class="flex flex-col">
    <label class="swap text-xl p-20 text-center">
        <input bind:checked type="checkbox" style="display: none;" />
        <div class="swap-off">Intermediário</div>
        <div class="swap-on">Iniciante</div>
    </label>

    {#each curRank as user, i}
        <div class="text-center">
            {i+1}. 
            {user.username}:
            {user.points}
        </div>
    {/each}
</div>
