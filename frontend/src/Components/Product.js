import React, { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import styles from './product.module.css'
// import CartContext from "./Store/cart-context"
import Loader from "./Loader"
import { useDispatch } from "react-redux"
import { cartActions } from "./redux-store/Index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let isValid = false


function Product() {
  let [amount, setAmount] = useState('1')
  let [products, setProducts] = useState([])
  // let [added, setAdded] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  // let [inputIsValid, setInputIsValid] = useState(false)
  // const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  let [imgIndex, setImgIndex] = useState(0)
  let amountInputRef = useRef()
  // let ctx = useContext(CartContext)
  let dispatch = useDispatch()
  // let cart = useSelector(state => state.cart)

  const { productId } = useParams()
  const url = `http://127.0.0.1:8009/store-api/products/${productId}`
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

  // useEffect(() => {
  //   // console.log(ctx.items)
  //   console.log(cart)
  // }, [ cart])

  // const products = props.Lists.find(prod => String(prod._id) === productId)


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
      // setInputIsValid(true);
      // setAdded(false)
      isValid = true
      if (isValid === true) {
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
      } else {
        isValid = false
      }
      return;
    }
    isValid = false
    //redux//

    dispatch(cartActions.addToCart({
      id: products._id,
      title: products.name,
      images: products.images[0],
      quantity: enteredAmountNum,
      price: products.price,
    }))


    //redux//
    // addToCartHandler(enteredAmountNum)
    setAmount('1')
  }

  let amountChangeHandler = (e) => {
    setAmount(e.target.value)
  }
  let addedToCartHandler = () => {
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
              {/* {inputIsValid && <p>Can't add more than 9 items at once.</p>} */}
              {/* {added && <p>Item added to cart</p>} */}
              <form onSubmit={amountFormHandler}>
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
                  onClick={addedToCartHandler}
                  className={styles.button}>Add to cart</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product