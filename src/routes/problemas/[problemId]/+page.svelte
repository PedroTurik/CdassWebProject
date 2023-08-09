<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    let title: HTMLDivElement;
    let text: HTMLDivElement;



</script>

<div bind:this={title} class="text-7xl text-accent text-center py-10">
    {data.title}
</div>

<div bind:this={text} class="mx-32 whitespace-pre-wrap">
    {data.text}
</div>
