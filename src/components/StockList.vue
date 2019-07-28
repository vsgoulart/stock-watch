<template>
  <div>
    <span
      v-for="(stock, index) in stocks"
      :key="index"
      @click="removeStock(stock)"
      >{{ stock }}</span
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Actions } from '../store'

export default Vue.extend({
  name: 'StockList',
  computed: {
    stocks(): string[] {
      return this.$store.state.stocks
    },
  },
  methods: {
    removeStock(stock: string) {
      this.$store.dispatch(Actions.REMOVE_STOCK, stock)
    },
  },
})
</script>
