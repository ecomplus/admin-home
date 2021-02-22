<template>
  <article class="ec-orders-graph">
    <div
      class="row align-items-center"
      :key="JSON.stringify(dateRange)"
    >
      <div class="col-lg-9">
        <div class="mx-auto">
          <canvas
            v-show="isLoaded"
            ref="canva"
            width="400"
            height="160"
          ></canvas>
        </div>
      </div>

      <div class="d-none d-lg-block col-lg-3">
        <canvas
          v-show="isLoaded"
          ref="canva-pie"
          width="200"
          height="200"
        ></canvas>
      </div>
    </div>
  </article>
</template>

<script src="./js/EcOrdersGraphs.js"></script>
