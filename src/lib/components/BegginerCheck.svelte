<script lang="ts">
    import { userData } from "$lib/firebase";

    export let check: boolean;

    let show = !check || (check && $userData?.newbie);

    console.log(show)

</script>
  
{#if show}
  <slot />
{/if}
