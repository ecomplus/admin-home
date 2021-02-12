<template>
  <div class="ec-payment-methods-graph">
    <div
      class="mx-auto mb-4"
      style="max-width: 200px"
    >
      <canvas
        ref="canva-small"
        width="200"
        height="200"
      ></canvas>
    </div>

    <div
      class="mx-auto"
      style="max-width: 300px"
    >
      <canvas
        ref="canva-big"
        width="300"
        height="300"
      ></canvas>
    </div>
  </div>
</template>

<script src="./js/EcPaymentMethodsChart.js"></script>
