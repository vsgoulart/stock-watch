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

export enum Actions {
  addStock = 'addStock',
  removeStock = 'removeStock',
  setPrice = 'setPrice',
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
    [Actions.addStock](state, newStock: string) {
      state = {
        ...state,
        stocks: [...state.stocks, newStock],
      }
    },
    [Actions.removeStock](state, stockToRemove: string) {
      state = {
        ...state,
        stocks: state.stocks.filter(stock => stock !== stockToRemove),
      }
    },
    [Actions.setPrice](state, payload: SetPricePayloadType) {
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
    [Actions.addStock]({ commit }, stock: string) {
      commit(Actions.addStock, stock)
    },
    [Actions.removeStock]({ commit }, stock: string) {
      commit(Actions.removeStock, stock)
    },
    [Actions.setPrice]({ commit }, price: PriceEntity) {
      commit(Actions.setPrice, {
        price,
        timestamp: Date.now(),
      })
    },
  },
})
