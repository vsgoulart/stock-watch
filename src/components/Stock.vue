<template>
  <md-card v-if="stock">
    <md-card-header>
      <div class="md-title">{{ stock.isin }}</div>
    </md-card-header>
    <md-card-content class="content">
      <span>Price: {{ stock.price }}</span>
      <span>Bid: {{ stock.bid }}</span>
      <span>Ask: {{ stock.ask }}</span>
      <span>Last updated: {{ stock.timestamp }}</span>
    </md-card-content>
    <md-card-actions>
      <md-button @click="removeStock">Remove</md-button>
    </md-card-actions>
  </md-card>
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

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 10px;
}
</style>
