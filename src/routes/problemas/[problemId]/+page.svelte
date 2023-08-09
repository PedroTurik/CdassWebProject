<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let title: HTMLDivElement;
    let text: HTMLDivElement;

    onMount(() => {
        title.innerHTML = data.title;
        text.innerHTML = data.text;
    })

</script>

<div bind:this={title} class="text-lg">
</div>

<div bind:this={text} class="mx-32 article">
</div>