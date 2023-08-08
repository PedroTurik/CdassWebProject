<script>
  import { page } from "$app/stores";
  import { user, userData } from "$lib/firebase";
</script>

<div class="navbar bg-base-100 w-screen">
  <div class="navbar-start">
    <a href="/">
      <div class="max-h-24" />
    </a>
  </div>
  <div class="navbar-center lg:gap-11">
    <a
      href="/"
      class="btn btn-ghost rounded-none normal-case text-lg max-sm:text-sm"
      class:btn-active={$page.route.id === "/"}>Home</a
    >
    <a
      href="/problemas"
      class="btn btn-ghost rounded-none normal-case text-lg max-sm:text-sm"
      class:btn-active={$page.route.id?.includes("problemas")}>Problemas</a
    >
    <a
      href="/rank"
      class="btn btn-ghost rounded-none normal-case text-lg max-sm:text-sm"
      class:btn-active={$page.route.id?.includes("rank")}>Ranking</a
    >
  </div>
  <div class="navbar-end">
    {#if $userData}
      <a
        href="/profile"
        class="btn btn-ghost rounded-none normal-case text-lg max-sm:text-sm"
      >
        <div class="avatar">
          <div class="w-8 rounded-full">
            <img src={$userData.photoURL} alt="userphoto" />
          </div>
        </div>
        {$userData.username}
      </a>
    {:else}
      <a
        href="/login"
        class="btn btn-ghost rounded-none normal-case text-lg max-sm:text-sm"
        >Log In</a
      >
    {/if}
  </div>
</div>
