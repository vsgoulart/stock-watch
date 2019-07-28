<template>
  <div>
    <md-chip
      class="md-primary stock"
      md-deletable
      v-for="(stock, index) in stocks"
      :key="index"
      @click="removeStock(stock)"
      >{{ stock }}</md-chip
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

<style lang="scss" scoped>
.stock {
  margin-bottom: 5px;
}
</style>
