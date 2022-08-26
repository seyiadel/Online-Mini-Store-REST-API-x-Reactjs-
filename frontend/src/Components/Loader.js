import React from 'react'
import styles from './Loader.module.css'

function Loader() {
    return (
        <div className={styles.span}>
            <div className={styles.span2}>
            <div className={styles.typing_loader}></div>
            </div>
        </div>
    )
}

export default Loader