import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {shorter, isInCart, quantityCounter} from "../helpers/functions";
import { CartContext } from '../context/CartContextProvider';
import trashIcon from "../assets/icons/trash.svg";
import styles from "./Product.module.css";

const Product = ({productData}) => {

    const {state, dispatch} = useContext(CartContext);

    return (
        <div className={styles.container} >
            <img className={styles.cardImage} src={productData.image} alt="product" />
            <h3>{shorter(productData.title)}</h3>
            <p>{`${productData.price} $`}</p>
            <div className={styles.linkContainer}>
                <Link to={`/products/${productData.id}`}>Details</Link>
                <div className={styles.buttonContainer}>
                    { quantityCounter(state, productData.id) === 1 && <button className={styles.smallButton} onClick={() => dispatch({type: "REMOVE_ITEM", payload: productData})}><img src={trashIcon} alt="trash" /></button>}
                    { quantityCounter(state, productData.id) > 1 && <button className={styles.smallButton} onClick={() => dispatch({type: "DECREASE", payload: productData})}>-</button>}
                    { quantityCounter(state, productData.id) > 0 && <span className={styles.counter}>{ quantityCounter(state, productData.id)}</span>}
                    {
                        isInCart(state, productData.id) ?
                        <button className={styles.smallButton} onClick={() => dispatch({type: "INCREASE", payload: productData})}>+</button> :
                        <button onClick={() => dispatch({type: "ADD_ITEM", payload: productData})}>Add to Cart</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;