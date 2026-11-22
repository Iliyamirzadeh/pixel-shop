export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((item) => item.id === action.product.id)

      if (existing) {
        return state.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      }

      const { id, title, brand, category, price, accent, stock } = action.product
      return [...state, { id, title, brand, category, price, accent, stock, quantity: 1 }]
    }

    case 'INCREASE':
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item
      )

    case 'DECREASE':
      return state
        .map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)

    case 'REMOVE':
      return state.filter((item) => item.id !== action.id)

    case 'CLEAR':
      return []

    default:
      return state
  }
}