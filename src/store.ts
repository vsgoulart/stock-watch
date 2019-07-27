import Vue from 'vue'
import Vuex from 'vuex'

import { PriceEntity } from './type'

Vue.use(Vuex)

interface Price extends PriceEntity {
  timestamp: number
}

interface State {
  stocks: ReadonlyArray<string>
  prices: Readonly<{ [key: string]: Price }>
}

type SetPricePayloadType = {
  price: PriceEntity
  timestamp: number
}

export const store = new Vuex.Store<State>({
  state: {
    stocks: [],
    prices: {},
  },
  mutations: {
    addStock(state, newStock: string) {
      state = {
        ...state,
        stocks: [...state.stocks, newStock],
      }
    },
    removeStock(state, stockToRemove: string) {
      state = {
        ...state,
        stocks: state.stocks.filter(stock => stock !== stockToRemove),
      }
    },
    setPrice(state, payload: SetPricePayloadType) {
      state = {
        ...state,
        prices: {
          ...state.prices,
          [payload.price.isin]: {
            ...payload.price,
            timestamp: payload.timestamp,
          },
        },
      }
    },
  },
  actions: {
    addStock({ commit }, stock: string) {
      commit('addStock', stock)
    },
    removeStock({ commit }, stock: string) {
      commit('removeStock', stock)
    },
    setPrice({ commit }, price: PriceEntity) {
      commit('setPrice', {
        price,
        timestamp: Date.now(),
      })
    },
  },
})
