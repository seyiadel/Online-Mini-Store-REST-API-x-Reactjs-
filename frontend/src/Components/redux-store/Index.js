import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

let defaultCartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultCartState,
    reducers: {
        addToCart(state, action) {
            let newItem = action.payload
            let existingCartItem = state.items.find((item) => item.id === newItem.id)
            if (!existingCartItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.title,
                    price: newItem.price,
                    image: newItem.images,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price
                })
                state.totalQuantity = state.totalQuantity + newItem.quantity
                state.totalAmount = state.totalAmount + newItem.price
            }
            else {
                state.totalQuantity = state.totalQuantity + 1
                existingCartItem.quantity = existingCartItem.quantity + 1
                existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price
                state.totalAmount = state.totalAmount + existingCartItem.price
            }
        },
        removeCartItem(state, action) {
            let id = action.payload
            let existingCartItem = state.items.find((item) => item.id === id)
            state.totalQuantity = state.totalQuantity - 1
            if (existingCartItem.quantity === 1) {
                state.items = state.items.filter(((item) => item.id !== id))
                state.totalAmount = state.totalAmount - existingCartItem.price
            } else {
                existingCartItem.quantity = existingCartItem.quantity - 1
                existingCartItem.totalPrice = existingCartItem.price * existingCartItem.quantity
                state.totalAmount = state.totalAmount - existingCartItem.price
            }
        },
        clearCart(state) {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0
        }
    }
})

let persistConfig = {
    key : 'root',
    storage,
}

let persistedReducer = persistReducer(persistConfig ,cartSlice.reducer )

let store = configureStore({
    reducer: {
        cart: persistedReducer
    },
    middleware : [thunk]
})

export const cartActions = cartSlice.actions
export default store

