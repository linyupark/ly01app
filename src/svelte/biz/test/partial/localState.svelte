<script>
  import { num, taxi } from "$src/libs/nanostores/demo/spa";
  import { onDestroy, onMount } from "svelte";

  export let n = num;

  const activeCurrent = () => {
    document.querySelectorAll(`#topNav li a`).forEach(el => el.style.color = "#000");
    document.querySelector(
      `#topNav li a[href="${$taxi.currentLocation.pathname}"]`
    ).style.color = "red";
  };

  onMount(() => {
    console.log("taxi on mount", $taxi);
    activeCurrent();
    $taxi.on("NAVIGATE_IN", ({ to }) => {
      console.log("nav to " + JSON.stringify(to.title));
      activeCurrent();
    });
  });

  onDestroy(() => {
    console.log("taxi on destroy");
    // $taxi.off('NAVIGATE_IN')
  });
</script>

<button on:click={() => $n++}>+{$n}</button>
{#if $taxi}
  <button on:click={() => $taxi.navigateTo("/taxi/about")}>js to About</button>
{/if}
