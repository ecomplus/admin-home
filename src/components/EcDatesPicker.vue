<template>
  <date-range-picker
    v-model="dateRange"
    opens="left"
    :locale-data="locale"
    :ranges="ranges"
    :max-date="new Date()"
    @update="saveDateRange"
  >
  </date-range-picker>
</template>

<script src="./js/EcDatesPicker.js"></script>
