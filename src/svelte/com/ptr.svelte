<script>
  import { onMount, onDestroy, setContext } from "svelte";
  import PullToRefresh from "pulltorefreshjs";
  let ptrContainer;
  export let onRefresh = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("refresh done");
  };

  onMount(() => {
    PullToRefresh.init({
      mainElement: ptrContainer,
      instructionsPullToRefresh: " ",
      instructionsReleaseToRefresh: " ",
      instructionsRefreshing: " ",
      iconRefreshing: `<i i-ion-reload-outline animate-spin />`,
      distThreshold: 40,
      distReload: 30,
      getStyles: () =>
        "\n.__PREFIX__ptr {\n pointer-events: none;\n  font-size: 0.85em;\n  font-weight: bold;\n  top: 0;\n  height: 0;\n  transition: height 0.3s, min-height 0.3s;\n  text-align: center;\n  width: 100%;\n  overflow: hidden;\n  display: flex;\n  align-items: flex-end;\n  align-content: stretch;\n}\n\n.__PREFIX__box {\n  padding: 0px;\n  flex-basis: 100%;\n}\n\n.__PREFIX__pull {\n  transition: none;\n}\n\n.__PREFIX__text {\n  margin-top: .33em;\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.__PREFIX__icon {\n  color: rgba(0, 0, 0, 0.3);\n  transition: transform .3s;\n}\n\n/*\nWhen at the top of the page, disable vertical overscroll so passive touch\nlisteners can take over.\n*/\n.__PREFIX__top {\n  touch-action: pan-x pan-down pinch-zoom;\n}\n\n.__PREFIX__release .__PREFIX__icon {\n  transform: rotate(180deg);\n}\n",
      onRefresh,
    });
  });

  onDestroy(() => {
    PullToRefresh.destroyAll();
  });
</script>

<div bind:this={ptrContainer}>
  <slot />
</div>
