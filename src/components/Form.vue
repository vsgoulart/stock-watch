<template>
  <form @submit.prevent="handleSubmit" @keydown.enter="handleSubmit">
    <label for="isin">
      ISIN
      <input
        type="text"
        id="isin"
        name="isin"
        v-model="isin"
        v-bind:disabled="disabled"
      />
    </label>
    <button type="submit" v-bind:disabled="disabled">Add</button>
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
