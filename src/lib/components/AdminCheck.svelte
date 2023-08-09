<script lang="ts">
    import { userData } from "$lib/firebase";
</script>
  
{#if $userData?.admin}
  <slot />
{/if}
