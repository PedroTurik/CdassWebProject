<script lang="ts">
    import { signOut } from 'firebase/auth';
    import { auth, userData } from '$lib/firebase';

</script>

<div class="flex flex-col space-y-11">

    <div class="text-success text-xl mx-auto"> Pontos Totais: {$userData?.points}</div>

    <a href="/" class="mx-auto">
        <button class="btn btn-primary" on:click={() => signOut(auth)}>Sign Out</button>
    </a>
</div>