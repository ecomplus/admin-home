<template>
  <date-range-picker
    v-model="dateRange"
    :locale-data="locale"
    :ranges="ranges"
    :max-date="new Date()"
  >
  </date-range-picker>
</template>

<script src="./js/EcDatesPicker.js"></script>
