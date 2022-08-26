import React from 'react'
import Items from './Items';
import styles from './Main.module.css'
import CarouselItems from './CarouselItems';

function Main(props) {
    return (
        <div>
            <CarouselItems List = {props.List}/>
            <Items Lists={props.Lists} />
            <div className={styles.errParent}>
                {props.empty && <h1 className={styles.errMessage}>Sorry, we couldn't find "{props.search}" in our store.</h1>}
            </div>
        </div>
    )
}

export default Main