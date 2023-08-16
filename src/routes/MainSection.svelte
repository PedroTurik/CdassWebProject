<script lang="ts">
  import { user, userData } from "$lib/firebase";
  import { onMount } from "svelte";
  const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  let title_text: HTMLHeadingElement;

  onMount(async () => {
    await sleep(1000);
    const hello = "Hello, " + ($userData?.username ?? "world") + "...";
    let hello_size = hello.length;
    const title = "Clube de Algoritmos";

    for (const c of hello) {
      await sleep(100);
      title_text.innerHTML += c;
    }

    sleep(100);

    while (hello_size > 0) {
      await sleep(50);
      title_text.innerHTML = title_text.innerHTML.slice(0, -1);
      hello_size--;
    }

    for (const c of title) {
      await sleep(100);
      title_text.innerHTML += c;
    }
  });
</script>

<section class="flex flex-col items-center min-h-[400px] py-24 px-[20vw]">
  <div class="hero-content">
    <div>
      <!-- svelte-ignore a11y-missing-content -->
      <h1
        bind:this={title_text}
        class="font-[handjet] tracking-widest p-2 text-7xl text-transparent bg-clip-text bg-primary text-center"
      />
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Handjet&family=Pacifico&display=swap");
</style>
