<template>
  <article
    :key="JSON.stringify(dateRange)"
    class="ec-orders-graph m-2"
  >
    <div
      v-if="!isLoaded"
      class="text-center"
    >
      <div class="my-4 d-flex justify-content-center">
        <div
          class="spinner-grow"
          style="width: 6rem; height: 6rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <canvas
      ref="canva"
      width="400"
      height="160"
    ></canvas>
  </article>
</template>

<script src="./js/EcOrdersGraphs.js"></script>
