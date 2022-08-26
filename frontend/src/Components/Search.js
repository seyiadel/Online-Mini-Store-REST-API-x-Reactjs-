import React from 'react'
import styles from './Search.module.css'


let Search = (props) => {
    return (
        <div className={styles.form}>
            <form
                onSubmit={props.onSubmit}>
                <div className={styles.input}>
                    <input
                        onChange={props.onChange}
                        value={props.value}
                        placeholder={props.placeholder}
                        type={props.type} />
                </div>
            </form>
        </div>
    )
}

export default Search
