import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
// import Lists2 from './List2'
import axios from 'axios';
import styles from './CarouselItems.module.css'
import Flickity from "react-flickity-component";
import 'flickity/dist/flickity.min.css';

function CarouselItems(props) {
    const [product, setProduct] = useState([])
    let url = "https://thegorana.herokuapp.com/products/?page=38"
    useEffect(() => {
        const getProduct = async () => {
            // setIsLoading(true)
            axios.get(url).then((response) => {
                let data = response.data.results
                setProduct(data)
                //   setIsLoading(false)
            })
        }
        getProduct();
    }, [url]);
    return (
        <div className={styles.head}>
            <div style={{ display: 'flex' }} />
            <Flickity
                options={{
                    contain: true,
                    fullscreen: true,
                    pageDots: true,
                    adaptiveHeight: true,
                    groupCells: true,
                    autoPlay: true
                }}
            >
                {product.map((list) => (
                    <div key={list._id}>
                        <div className={styles.wrapper}>
                            <Link to={`/products/${list._id}`}>
                                <img src={list.images?.[0]} alt={list._id} />
                            </Link>
                        </div>
                        <div className={styles.title}>
                            {/* <h3>{list.name}</h3> */}
                        </div>
                    </div>
                ))}
            </Flickity>
        </div>
    )
}

export default CarouselItems