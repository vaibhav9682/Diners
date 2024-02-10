// OrderConfirmationPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import style from './placed.module.css'
import deliever from '../../Assets/delievery.svg'

const OrderConfirmationPage = () => {

    function generateRandomFoodId(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }

        return result;
    }

    return (
        <div className={style.confirmation_container}>
            <div className={style.confirmation_content}>
                <h2>Thank You for Your Order!</h2>
                <p>Your delicious food is on the way.</p>
                <img src={deliever} alt="Order Confirmation" className={style.confirmation_image} />
                <p>Order ID: #{generateRandomFoodId(8)}</p>
                <p>Estimated Delivery Time: 30 minutes</p>
                <Link to="/" className={style.back_to_home}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
