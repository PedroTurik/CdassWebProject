<script lang="ts">
    import { page } from "$app/stores";
    import type { ActionData, PageData } from "./$types";
    import { userData } from "$lib/firebase";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { error } from "@sveltejs/kit";
    import { enhance } from "$app/forms";
    import BegginerCheck from "$lib/components/BegginerCheck.svelte";

    export let data: PageData;
    let problemId: number = +$page.url.pathname.split("/")[2];

    export let form: ActionData;

    function viewInput() {
        let wnd = window.open("about:blank", "", "_blank");
        if (!wnd) {
            throw error(500, "i have no clue");
        }
        
        wnd.document.write(data.input);
        wnd.document.body.style.whiteSpace = "pre-wrap";
    }
</script>

<div class="text-7xl text-accent text-center py-10">
    {data.title}
</div>

<div class="mx-32 whitespace-pre-wrap">
    {data.text}
</div>

<div>
    <button on:click={viewInput} class="btn btn-secondary m-10">
        Ver input
    </button>
</div>

<div>
    {#if form?.status == "wrong"}
        <div class="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>Resposta Errada</span>
        </div>
    {:else if form?.status == "answered"}
        <div class="alert alert-warning">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                /></svg
            >
            <span>Você já respondeu esse desafio</span>
        </div>
    {:else if form?.status == "success"}
        <div class="alert alert-success">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>Parabén, você acertou, pode checar seus pontos</span>
        </div>
    {/if}
</div>
<div class="w-1/5 m-auto">
    <AuthCheck>
        <BegginerCheck check={data.begginer}>
            <form
                class="flex flex-row text-center my-10"
                method="POST"
                use:enhance
            >
                <input
                    type="hidden"
                    name="username"
                    value={$userData?.username}
                />
                <input type="hidden" name="problemId" value={problemId} />
                <input type="text" name="answer" class="input input-success" />
                <button class="btn btn-success"> checar resposta</button>
            </form>
        </BegginerCheck>
    </AuthCheck>
</div>
