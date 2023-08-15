<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let username = "";
  let begginer: boolean;
  let loading = false;
  let isAvailable = false;

  let debounceTimer: NodeJS.Timeout;

  async function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);

    loading = true;

    debounceTimer = setTimeout(async () => {
      console.log("checking availability of", username);

      const ref = doc(db, "usernames", username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      loading = false;
    }, 500);
  }

  async function confirmUsername() {
    console.log("confirming username", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username: username,
      photoURL: $user?.photoURL ?? null,
      admin: false,
      newbie: begginer,
      points: 0,
    });

    await batch.commit();

    username = "";
    isAvailable = false;
  }

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid =
    username?.length > 2 && username.length < 16 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !loading;
</script>

<AuthCheck>
  {#if $userData?.username}
    <p>Seu usuário é <span class="text-primary">{$userData.username}</span></p>
    <p>Nomes de usuário não podem ser modificados</p>
  {:else}
    <form class="w-2/5 space-y-5" on:submit|preventDefault={confirmUsername}>
      <div class="flex flex-col lg:flex-row gap-4">
        <input
          type="text"
          placeholder="Username"
          class="input input-bordered w-full input-success"
          class:input-error={!isValid && isTouched}
          class:input-warning={isTaken}
          class:input-success={isAvailable && isValid && !loading}
          bind:value={username}
          on:input={checkAvailability}
        />
        <div class="form-control">
          <label class="cursor-pointer label text-right">
            <span class="label-text m-1">Iniciante?</span>
            <input bind:checked={begginer} type="checkbox" class="checkbox checkbox-secondary" />
          </label>
        </div>
      </div>
      <div class="my-4 min-h-16 px-8 w-full">
        {#if loading && isTouched}
          <p class="text-secondary">Checando viabilidade de @{username}...</p>
        {:else if !isValid && isTouched}
          <p class="text-error text-sm">
            Digite entre 3-16 caracteres alfanuméricos
          </p>
        {:else if isTaken}
          <p class="text-warning text-sm">
            @{username} não está disponível
          </p>
        {:else if isTouched}
          <button class="btn btn-success"
            >Confirmar usuário @{username}
          </button>
        {/if}
      </div>
    </form>
  {/if}
</AuthCheck>
