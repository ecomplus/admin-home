<template>
  <div
    class="ec-buyers-profile-chart mx-auto"
    style="max-width: 500px"
  >
    <div class="mb-5">
      <canvas
        ref="canva-radar"
        width="400"
        height="300"
      ></canvas>
    </div>

    <div>
      <canvas
        ref="canva-doughnut"
        width="400"
        height="200"
      ></canvas>
    </div>
  </div>
</template>

<script src="./js/EcBuyersProfileChart.js"></script>
