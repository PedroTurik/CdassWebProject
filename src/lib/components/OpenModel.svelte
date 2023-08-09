<script lang="ts">
    let dialog: HTMLDialogElement;

    export let modelText = "Open Model"
</script>

<!-- Open the modal using ID.showModal() method -->
<button
    class="btn"
    on:click={() => {
        dialog.showModal();
    }}>{modelText}</button
>

<dialog bind:this={dialog} class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box">
        <slot />
        <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </div>
    </form>
</dialog>
