<script lang="ts">
    import type { PageData } from "./$types";

    let checked: boolean;

    export let data: PageData;
    let curRank: RankUserData[];
    $: if (!checked) {
        curRank = data.interRank;
    } else {
        curRank = data.begginerRank;
    }

    console.log("inter", data.interRank)
    console.log("beg", data.begginerRank)
    console.log("cur", curRank!)
    
</script>

<div class="flex flex-col">
    <label class="swap text-xl p-20 text-center">
        <input bind:checked={checked} type="checkbox" style="display: none;" />
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
