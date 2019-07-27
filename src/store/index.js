import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const stocks = new Vuex.Store({
  state: {
    stocks: [],
    prices: {},
  },
  mutations: {
    add(state, newStock) {
      state = {
        stocks: [...state.stocks, newStock],
      }
    },
    remove(state, stockToRemove) {
      state = {
        stocks: state.stocks.filter(stock => stock !== stockToRemove),
      }
    },
  },
})
