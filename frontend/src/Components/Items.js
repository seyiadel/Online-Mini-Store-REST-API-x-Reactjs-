import React from 'react'
import { Link } from "react-router-dom";
import styles from './Items.module.css'

function Items(props) {

    return (
        <ul className={styles.list}>
            {props.Lists.map((product) => (
                <div key={product._id} className={styles.card}>
                    <div className={styles.card2}>
                        <div className={styles.wrapper}>
                            <Link to={`/products/${product._id}`}>
                                <img src={product.images[0]} alt={product.name}></img>
                            </Link>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.innerInfo}>
                                <div>
                                    <h1 className={styles.title}>{product.name}</h1>
                                    {/* <h1 className={styles.title}>{product.title}</h1> */}
                                </div>
                                <div>
                                    <h3 className={styles.price}>₦{product.price.toFixed(2)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </ul>
    )
}

export default Items