// CheckoutPage.js
import { collection, onSnapshot } from "firebase/firestore";
import db from '../../config/firebase'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import style from './checkout.module.css'

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        paymentMethod: 'creditCard',
    });

    //fetch data

    const [cartItem, setCartItem] = useState([])
    useEffect(() => {


        var getList = async () => {


            // const querySnapshot = await getDocs(collection(db, "cart"));


            const unsub = onSnapshot(collection(db, "cart"), (snapShot) => {
                const items = []

                snapShot.forEach((doc) => {
                    items.push({
                        id: doc.id,
                        data: doc.data()
                    })

                });
                setCartItem(items)

            });


            console.log(cartItem)
        }
        getList()


    }, [])


    const getTotal = () => {

        var total = 0;
        for (let i = 0; i < cartItem.length; i++) {
            total += cartItem[i].data.price

        }
        return total

    }

    //fetch data

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle the form submission (e.g., send data to the server, update the state, etc.)
        console.log('Form submitted:', formData);
        // Redirect or display a success message as needed
    };

    return (

        <div className={style.container}>
            <div className={style.checkout_opt}>
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Name :</span>

                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        <span>Email :</span>

                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        <span>Address :</span>

                        <textarea name="address" value={formData.address} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        <span>Payment Method :</span>

                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="creditCard">Credit Card</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </label>
                    <br />
                    <Link to='/placed'><button type="submit">Place Order</button></Link>
                </form>
                <p>
                    {/* Add a link to go back to the previous page or the home page */}
                    <Link to="/menu">Back to Menu</Link>
                </p>
            </div>
            <div className={style.checkout_details}>
                <div className="cart-data">
                    {cartItem.map((item, i) => (
                        <div className="card mb-2 cart-item" id={style.cart_item} key={i} >
                            <div className="row g-0 cart-options">
                                <div className="col-md-4">
                                    <img src={item.data.img} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h6 className="card-title">{item.data.name}</h6>
                                        <div className="details">
                                            <p className="card-text"><small className="text-body-secondary">&#8377; &nbsp;{item.data.price}</small></p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.total}>
                    <div className="amount"><span>
                        Total :
                    </span>
                        <span> &#8377; &nbsp;{getTotal()} </span>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CheckoutPage;
