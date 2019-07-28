<template>
  <div v-if="stock">
    <div>
      <span>{{ stock.isin }}</span>
      <br />
      <span>{{ stock.price }}</span>
      <br />
      <span>{{ stock.bid }}</span>
      <br />
      <span>{{ stock.ask }}</span>
      <br />
      <span>{{ stock.timestamp }}</span>
    </div>
    <button type="button" @click="removeStock">X</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Stock, Actions } from '../store'

export default Vue.extend({
  name: 'Stock',
  props: ['isin'],
  computed: {
    stock(): Stock | undefined {
      return this.$store.state.prices[this.isin]
    },
  },
  methods: {
    removeStock() {
      if (this.stock) {
        this.$store.dispatch(Actions.REMOVE_STOCK, this.stock.isin)
      }
    },
  },
})
</script>
