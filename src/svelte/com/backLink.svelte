<script>
  let count = 0;
  const onClick = () => {
    count++;
  };
</script>

<button block h-full flex items-center on:click={onClick}>
  <i i-ion-chevron-back-outline />
  ({count})
</button>
