<template>
  <form
    @submit.prevent="handleSubmit"
    @keydown.enter="handleSubmit"
    class="form"
  >
    <md-field md-inline>
      <label>ISIN</label>
      <md-input
        id="isin"
        name="isin"
        v-model="isin"
        v-bind:disabled="disabled"
      ></md-input>
    </md-field>
    <md-button
      class="md-raised md-primary"
      type="submit"
      v-bind:disabled="disabled"
      >Add</md-button
    >
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import { Actions } from '../store'

export default Vue.extend({
  name: 'Form',
  data() {
    return {
      isin: '',
    }
  },
  computed: {
    disabled(): boolean {
      return !this.$store.state.socket.isConnectionOpen
    },
  },
  methods: {
    handleSubmit() {
      if (this.isin) {
        this.$store.dispatch(Actions.ADD_STOCK, this.isin)

        this.isin = ''
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  width: 200px;
}
</style>
