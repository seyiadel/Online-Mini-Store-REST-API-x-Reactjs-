import React from 'react'
import styles from './Cart.module.css'
// import CartContext from './Store/cart-context'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from './redux-store/Index'

function Cart(props) {
    let dispatch = useDispatch()
    let items = useSelector(state => state.cart.items)
    let amount = useSelector(state => state.cart.totalAmount)
    // let ctx = useContext(CartContext)
    // let showOrder = ctx.items.length > 0
    // let emptyOrder = ctx.items.length === 0
    let showOrder = items.length > 0
    let emptyOrder = items.length === 0
    // let totalSpent = `₦${ctx.totalAmount}`;
    let totalSpent = `₦${amount}`;

    const cartItemRemoveHandler = (id) => {
        // ctx.removeItem(id); 
        dispatch(cartActions.removeCartItem(id))
    };
    // const cartItemAddHandler = (item) => {
    //     // ctx.addItem({ ...item, amount: 1 });
    //     dispatch(cartActions.addToCart({
    //         id: item.id
    //     }))
    // };
    return (
        <div>
            <div className={styles.cover}>
                <div className={styles.modal}>
                    <h2>Cart</h2>
                    {emptyOrder && <h4 className={styles.empty}>Your cart is empty</h4>}
                    <div onClick={props.close} className={styles.close}>
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                    </div>
                    <div className={styles.list2}>
                        <ul className={styles['cart-items']}>
                            {items.map((item) => (
                                <div key={item.id} className={styles.cartList}>
                                    <div className={styles.cover1}>
                                        <div className={styles.items}>
                                            <h4 className={styles.h2}>{item.name}</h4>
                                            <li>{`₦${item.price}`}</li>
                                        </div>
                                        <div className={styles.quantity}>
                                            <div className={styles.amount}>X{item.quantity}</div>
                                            <div className={styles.button2}>
                                                <button onClick={() => { cartItemRemoveHandler(item.id) }}>-</button>
                                                <button onClick={() => dispatch(cartActions.addToCart({
                                                    id: item.id,
                                                    quantity: item.quantity,
                                                    totalPrice: item.totalPrice
                                                }
                                                ))}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.init}>
                        <div className={styles.init2}>
                            <h3>Total amount:</h3>
                            <h3>{totalSpent}</h3>
                        </div>
                        <div className={styles.init2}>
                            <h3>Shipping fee:</h3>
                            <h3>Free</h3>
                        </div>
                        <div>
                            <Link to="/checkout">
                                {showOrder && <button
                                    onClick={props.close}>Checkout</button>}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart