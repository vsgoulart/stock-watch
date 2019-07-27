export const mutations = {
  addStock(state, newStock) {
    state = {
      ...state,
      stocks: [...state.stocks, newStock],
    }
  },
  removeStock(state, stockToRemove) {
    state = {
      ...state,
      stocks: state.stocks.filter(stock => stock !== stockToRemove),
    }
  },
  setPrice(state, newPrice) {
    state = {
      ...state,
      prices: {
        ...state.prices,
        [newPrice.isin]: newPrice,
      },
    }
  },
}
