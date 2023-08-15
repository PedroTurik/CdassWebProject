<script lang="ts">
    import { signOut } from 'firebase/auth';
    import { auth, userData } from '$lib/firebase';
    import AuthCheck from '$lib/components/AuthCheck.svelte';

    async function signOutSSR() {
      const res = await fetch("/api/signin", { method: "DELETE" });
      await signOut(auth);
    }

</script>

<AuthCheck>
    <div class="flex flex-col space-y-11">
    
        <div class="text-success text-xl mx-auto"> Pontos Totais: {$userData?.points}</div>
    
        <a href="/" class="mx-auto">
            <button class="btn btn-primary" on:click={signOutSSR}>Sign Out</button>
        </a>
    </div>

</AuthCheck>