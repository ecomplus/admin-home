<template>
  <div class="ec-payment-methods-graph">
    <div
      class="mx-auto mb-5"
      style="max-width: 350px"
    >
      <canvas
        ref="canva-pie"
        width="350"
        height="350"
      ></canvas>
    </div>

    <div
      class="mx-auto"
      style="max-width: 500px"
    >
      <canvas
        ref="canva-bar"
        width="400"
        height="200"
      ></canvas>
    </div>
  </div>
</template>

<script src="./js/EcPaymentMethodsChart.js"></script>
