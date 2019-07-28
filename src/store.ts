import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface Stock {
  isin: string
  price: number
  bid: number
  ask: number
  timestamp: number
}

interface State {
  socket: {
    isConnectionOpen: boolean
    hasReconnectFailed: boolean
  }
  stocks: string[]
  prices: {
    [key: string]: Stock
  }
}

export enum Actions {
  ADD_STOCK = 'ADD_STOCK',
  REMOVE_STOCK = 'REMOVE_STOCK',
}

export const store = new Vuex.Store<State>({
  state: {
    socket: {
      isConnectionOpen: false,
      hasReconnectFailed: false,
    },
    stocks: [],
    prices: {},
  },
  mutations: {
    [Actions.ADD_STOCK](state, newStock: string) {
      if (!state.stocks.includes(newStock)) {
        state.stocks = [...state.stocks, newStock]
      }
    },
    [Actions.REMOVE_STOCK](state, stockToRemove: string) {
      state.stocks = state.stocks.filter(stock => stock !== stockToRemove)
    },
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget

      state.socket = {
        isConnectionOpen: true,
        hasReconnectFailed: false,
      }
    },
    SOCKET_ONMESSAGE(state, message) {
      state.prices = {
        ...state.prices,
        [message.isin]: {
          ...message,
          timestamp: Date.now(),
        },
      }
    },
    SOCKET_ONCLOSE(state) {
      Vue.prototype.$socket = undefined

      state.socket.isConnectionOpen = false
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.hasReconnectFailed = true
    },
  },
  actions: {
    [Actions.ADD_STOCK]({ commit }, stock: string) {
      commit(Actions.ADD_STOCK, stock)
      Vue.prototype.$socket.send(JSON.stringify({ subscribe: stock }))
    },
    [Actions.REMOVE_STOCK]({ commit }, stock: string) {
      commit(Actions.REMOVE_STOCK, stock)
      Vue.prototype.$socket.send(JSON.stringify({ unsubscribe: stock }))
    },
  },
})
