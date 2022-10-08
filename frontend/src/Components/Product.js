import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import styles from './product.module.css'
// import CartContext from "./Store/cart-context"
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux"
import { cartActions } from "./redux-store/Index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Product() {
  let [amount, setAmount] = useState('1')
  let [products, setProducts] = useState([])
  let [isLoading, setIsLoading] = useState(false)
  let [imgIndex, setImgIndex] = useState(0)
  // let [buttonShow, setButtonShow] = useState(false)
  let amountInputRef = useRef()
  // let [id, setId] = useState([])
  // let ctx = useContext(CartContext)
  let dispatch = useDispatch()

  let itemsId = useSelector((state) => state.cart.items)
  const { productId } = useParams()
  let itemId = itemsId.find((id, index) => id.id === productId)
  // const url = `http://127.0.0.1:8009/store-api/products/` //+${productId}
  let url = `https://thegorana.herokuapp.com/products/${productId}`
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true)
      axios.get(url).then((response) => {
        let data = response.data
        setProducts(data)
        setIsLoading(false)
      })
    }
    getProduct();
  }, [url]);
  // const addToCartHandler = (amount) => {
  //   ctx.addItem({
  //     key: products._id,
  //     id: products._id,
  //     title: products.name,
  //     images: products.images[0],
  //     amount: amount,
  //     price: products.price,
  //   });
  // }

  let amountFormHandler = (e) => {
    e.preventDefault()
    let enteredAmount = amountInputRef.current.value
    let enteredAmountNum = +enteredAmount

    if (enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 9) {
      toast.warning("Can't add more than 9 items at once.", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
      return;
    }
    //redux//

    dispatch(cartActions.addToCart({
      id: products._id,
      title: products.name,
      images: products.images[0],
      quantity: enteredAmountNum,
      price: products.price,
    }))


    //redux//
    if (enteredAmountNum >= 1 && enteredAmountNum <= 9) {
      toast.success('Item added to cart', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
    }
    // addToCartHandler(enteredAmountNum)
    setAmount('1')
  }

  let amountChangeHandler = (e) => {
    setAmount(e.target.value)
  }
  let addMoreToCartHandler = () => {
    dispatch(cartActions.addToCart({
      id: products._id,
      title: products.name,
      images: products.images[0],
      quantity: +1,
      price: products.price,
    }))
    toast.success('Item added to cart', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });
  }

  let removeMoreFromCartHandler = () => {
    itemsId.map((id, index) => (
      dispatch(cartActions.removeCartItem(id.id))
    ))
    toast.success("Item removed from cart", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });

}

return (
  <div>
    {isLoading && <Loader />}
    <ToastContainer />
    <div className={styles.body1}>
      <div className={styles.body}>
        <div className={styles.images}>
          <div className={styles.imagesInner}>
            <div className={styles.wrapper}>
              <img src={products.images?.[imgIndex]} alt={products.title}></img>
            </div>
            <div className={styles.imageSmall}>
              <div className={styles.wrapper2}>
                <img src={products.images?.[0]} alt={products.title} onClick={() => setImgIndex(0)}></img>
              </div>
              <div className={styles.wrapper2}>
                <img src={products.images?.[1]} alt={products.title} onClick={() => setImgIndex(1)}></img>
              </div>
              <div className={styles.wrapper2}>
                <img src={products.images?.[2]} alt={products.title} onClick={() => setImgIndex(2)}></img>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.descrip}>
          <div className={styles.name}>
            <h1>{products.name}</h1>
          </div>
          <p className={styles.price}>Price: ₦{products.price?.toFixed(2)}</p>
          <div className={styles.description}>
            <h3>Description: </h3>
            <p>{products.description}</p>
          </div>
          <div className={styles.list}>
            {!itemId && <form onSubmit={amountFormHandler}>
              <label>Quantity:</label>
              <input
                ref={amountInputRef}
                id={products._id}
                type='number'
                min='1'
                max='10'
                step='1'
                value={amount}
                onChange={amountChangeHandler}
              />
              <button
                className={styles.button}>Add to cart</button>
            </form>}
            {itemId && <div className={styles.extraButtons}>
              <button
                onClick={addMoreToCartHandler}
                className={styles.button}>+
              </button>
              <button
                onClick={removeMoreFromCartHandler}
                className={styles.button}>-
              </button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default Product