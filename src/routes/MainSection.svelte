<script lang="ts">
  import { onMount } from "svelte";
  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

  let title_text: HTMLHeadingElement;

  onMount(async () => {
    const hello = "Hello, World...";
    let hello_size = hello.length;
    const title = "Clube de Algorítimos";
    
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


  })

</script>

<section
    class="flex flex-col items-center min-h-[400px] py-24 px-[20vw]"
  >
    <div class="hero-content">
      <div>
        <h1 bind:this={title_text}
          class="font-[handjet] tracking-widest p-2 text-7xl text-transparent bg-clip-text bg-primary text-center"
        >
        </h1>
      </div>
    </div>
  </section>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Handjet&family=Pacifico&display=swap');
  </style>