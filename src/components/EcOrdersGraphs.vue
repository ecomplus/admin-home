<template>
  <article
    :key="JSON.stringify(dateRange)"
    class="ec-orders-graph m-2"
  >
    <canvas
      v-show="isLoaded"
      ref="canva"
      width="400"
      height="160"
    ></canvas>
  </article>
</template>

<script src="./js/EcOrdersGraphs.js"></script>
