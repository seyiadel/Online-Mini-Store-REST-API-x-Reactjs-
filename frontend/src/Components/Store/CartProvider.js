import React, { useReducer, useEffect } from 'react'
import CartContext from './cart-context'


let defaultCartState = {
    items: [],
    totalAmount: 0,
}

let cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        let existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        )
        let existingCartItem = state.items[existingCartItemIndex]
        let updatedItem
        let updatedItems

        if (existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItem = { ...action.item }
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE') {
        let existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        )
        let existingItem = state.items[existingCartItemIndex]
        let updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            let updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
}

function CartProvider(props) {
    let [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState , () =>{
        const localData = localStorage.getItem('items')
       return localData ? JSON.parse(localData) : defaultCartState
    })

    useEffect(() => {
        localStorage.setItem('items' , JSON.stringify(cartState))
    }, [cartState])


    let addItemToCartHandler = (item) => {
        dispatchCart({
            type: 'ADD',
            item: item
        })
    }

    let removeItemFromCartHandler = (id) => {
        dispatchCart({
            type: 'REMOVE',
            id: id
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider