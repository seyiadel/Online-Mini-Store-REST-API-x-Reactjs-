import React, { useState, useEffect } from 'react'
import NavBar from './Components/NavBar';
import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Main from './Components/Main';
import Product from './Components/Product';
import CartProvider from './Components/Store/CartProvider';
import CheckoutPage from './Components/CheckoutPage';
import axios from 'axios'
import Loader from './Components/Loader';


function App() {
  const [product, setProduct] = useState([])
  let [search, setSearch] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  let [empty, setEmpty] = useState(false)
  let [isOrdered, setIsOrdered] = useState(false)
  const [filteredResults, setFilteredResults] = useState(product);
  // let url = "http://127.0.0.1:8009/store-api/products/"
  let url = 'https://thegorana.herokuapp.com/products/?page=23'
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true)
      axios.get(url).then((response) => {
        let data = response.data.results
        setProduct(data)
        setIsLoading(false)
      })
    }
    getProduct();
  }, [url]);

  useEffect(() => {
    const filterResults = product.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredResults(filterResults);
    if (filterResults.length === 0) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  }, [search, product]);

  return (
    <CartProvider>
      <div>
        <div>
          <NavBar search={search} setSearch={setSearch} empty={empty} setIsOrdered={setIsOrdered} />
        </div>
        {isLoading && <Loader />}
        <div>
          <div className={styles.nav}>
            <Routes>
              <Route path="/" element={<Main Lists={filteredResults} List = {product} empty={empty} search={search} />} />
              <Route path="/products/:productId" element={<Product Lists={product} />} />
              <Route path="/checkout" element={<CheckoutPage setIsOrdered={setIsOrdered} isOrdered={isOrdered} />} />
            </Routes>
          </div>
        </div>
      </div>
    </CartProvider>
  )
}

export default App

