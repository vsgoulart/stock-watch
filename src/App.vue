<template>
  <div id="app">
    <Form />
    <h3 v-if="hasReconnectFailed">The connection has failed</h3>
    <StockList />
    <Stock v-for="stock in stocks" :key="stock" v-bind:isin="stock" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Actions } from './store'

import Form from './components/Form.vue'
import StockList from './components/StockList.vue'
import Stock from './components/Stock.vue'

export default Vue.extend({
  name: 'app',
  computed: {
    stocks(): string[] {
      return this.$store.state.stocks
    },
    hasReconnectFailed(): boolean {
      return this.$store.state.socket.hasReconnectFailed
    },
  },
  components: {
    Form,
    StockList,
    Stock,
  },
})
</script>

<style lang="scss" scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: #3e3e3e;
}
</style>
