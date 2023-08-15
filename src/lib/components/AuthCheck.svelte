<script lang="ts">
    import { user } from "$lib/firebase";
</script>
  
{#if $user}
  <slot />
{:else}
    <p class="alert alert-warning">
        You must be signed in to view this.
        <a class="btn btn-warning" href="/login">Sign in</a>
    </p>
{/if}