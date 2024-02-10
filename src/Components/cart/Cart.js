
import { collection, onSnapshot } from "firebase/firestore";
import db from '../../config/firebase'
import { useEffect, useState } from "react";
import cross from '../../Assets/cross.svg';
import { doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";


const Cart = ({ display }) => {
  const [cartItem, setCartItem] = useState([])
  useEffect(() => {


    var getList = async () => {


      // const querySnapshot = await getDocs(collection(db, "cart"));

      //eslint-disable-next-line
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

//eslint-disable-next-line
  }, [])


  const getTotal = () => {

    var total = 0;
    for (let i = 0; i < cartItem.length; i++) {
      total += cartItem[i].data.price

    }
    return total

  }

  const dishDeleteButton = async (id) => {
    await deleteDoc(doc(db, "cart", id));

  }


  return (
    <div className={`cart-container ${display ? "cart-container-show" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
      </div>
      <div className="cart-data">
        {cartItem.map((item, i) => (
          <div className="card mb-2 cart-item" key={i} >
            <div className="row g-0 cart-options">
              <div className="col-md-4">
                <img src={item.data.img} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h6 className="card-title">{item.data.name}</h6>
                  <div className="details">
                    <p className="card-text">
                      <small className="text-body-secondary">&#8377; &nbsp;{item.data.price}</small>
                    </p>
                    <button onClick={() => dishDeleteButton(item.id)}>
                      <img src={cross} alt="" />
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <div className="amount"><span>
          Total :
        </span>
          <span> &#8377; &nbsp;{getTotal()} </span>
        </div>
        <Link to='/checkout' className="checkout-btn">
          <button><h6>Checkout</h6></button>
        </Link>
      </div>
    </div >
  );
};

export default Cart;
