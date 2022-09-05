import React, { useState, useEffect } from 'react'
import Cart from './Cart';
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import Search from './Search'
// import CartContext from './Store/cart-context';
import { useSelector } from 'react-redux';

function NavBar({ search, setSearch }) {
    let [isClicked, setIsClicked] = useState(false)
    // let ctx = useContext(CartContext)
    // let numOfCartItems = ctx.items.reduce((currentNum, item) => {
    //     return currentNum + item.amount
    // }, 0);
    // let { items } = ctx
  let numOfCartItems = useSelector(state => state.cart.totalQuantity)
  let items = useSelector(state => state.cart.items)
    let [openNav, setOpenNav] = useState(false);

    let openMobileNav = () => {
        setOpenNav(true);
    };
    let closeMobileMenu = () => {
        setOpenNav(false);
    };
    let closeNav = () => {
        setOpenNav(false);
    };

    let submitFormHandler = (e) => {
        e.preventDefault()
    }

    let searchChangeHandler = (e) => {
        setSearch(e.target.value)
    }
    // let { items } = ctx
    let bump = `${styles.num} ${isClicked ? styles.bump : ''}`
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsClicked(true)
        let time = setTimeout(() => {
            setIsClicked(false)
        }, 300)
        return () => {
            clearTimeout(time)
        }
    }, [items])
    return (
        <div className={styles.nav}>
            {openNav && <Cart close={closeMobileMenu} />}
            <div className={styles.nav_child}>
                <div className={styles.nav_first}>
                    <Link to="/"
                        onClick={closeNav}>
                        <p>eCommerce</p>
                    </Link>
                </div>
                <div className={styles.nav_search}>
                    <Search
                        type={'search'}
                        value={search}
                        onSubmit={submitFormHandler}
                        onChange={searchChangeHandler}
                        placeholder={'Search Store...'}
                    />
                </div>
                <div
                    onClick={openMobileNav}
                    className={styles.nav_second}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
                    </svg>
                    <p className={bump}>{numOfCartItems}</p>
                    <p>Cart</p>
                </div>
            </div>
            <div className={styles.nav_search_mobile}>
                <Search
                    type={'text'}
                    value={search}
                    onSubmit={submitFormHandler}
                    onChange={searchChangeHandler}
                    placeholder={'Search Store...'}
                />
            </div>
        </div>
    )
}

export default NavBar