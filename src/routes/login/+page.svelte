<script lang="ts">
    import { auth, user, userData } from "$lib/firebase";
  
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
  
    async function signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
  
      const idToken = await credential.user.getIdToken();
  
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
        },
        body: JSON.stringify({ idToken }),
      });
    }
  
  </script>

<h2>LOGIN</h2>

{#if $userData}

    <h2 class="card-title">Already Logged In as <span class="text-primary">{$userData.username}</span></h2>
    <a href="/">
        <button class="btn btn-primary" >Home</button>
    </a>

{:else if $user}
    <h2 class="card-title">Hello {$user.displayName}</h2>
    <a href="/login/username">
        <button class="btn btn-primary" >Escolha seu Nome de Usuário</button>
    </a>
{:else}
    <button class="btn btn-primary" on:click={signInWithGoogle}>Sign In</button>
{/if}

