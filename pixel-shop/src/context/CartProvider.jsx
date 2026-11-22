import { useEffect, useReducer } from 'react'
import { CartContext } from './cartContext'
import { cartReducer } from './cartReducer'
import { cartSchema } from '../schemas/cart'

const STORAGE_KEY = 'pixel-shop-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const result = cartSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : []
  } catch {
    return []
  }
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = {
    items,
    totalCount,
    totalPrice,
    addItem: (product) => dispatch({ type: 'ADD', product }),
    increaseItem: (id) => dispatch({ type: 'INCREASE', id }),
    decreaseItem: (id) => dispatch({ type: 'DECREASE', id }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider