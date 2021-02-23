<template>
  <div
    class="ec-payment-methods-chart mx-auto"
    style="max-width: 500px"
  >
    <div class="mb-5">
      <canvas
        ref="canva-pie"
        width="400"
        height="300"
      ></canvas>
    </div>

    <div>
      <canvas
        ref="canva-bar"
        width="400"
        height="200"
      ></canvas>
    </div>
  </div>
</template>

<script src="./js/EcPaymentMethodsChart.js"></script>
