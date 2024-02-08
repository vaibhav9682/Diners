
import { collection, getDocs } from "firebase/firestore";
import db from '../../config/firebase'
import { useEffect, useState } from "react";
import cross from '../../Assets/cross.svg';


const Cart = ({ display }) => {

  const [cartItem, setCartItem] = useState([])

  useEffect(() => {


    const getList = async () => {
      const items = []

      const querySnapshot = await getDocs(collection(db, "cart"));


      querySnapshot.forEach((doc) => {

        items.push({
          id: doc.id,
          data: doc.data()
        })

        console.log(doc.id, " => ", doc.data());
      });

      setCartItem(items)
    }

    getList()

    console.log('use')

  }, [])




  return (
    <div className={`cart-container ${display ? "cart-container-show" : ""}`}>
      <div className="cart-header">
        <h2>cart</h2>
      </div>
      <div className="cart-data">
        {cartItem.map((item) => (
          <div className="card mb-2 cart-item" >
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.data.img} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.data.name}</h5>
                  <div className="details">
                    <p className="card-text"><small className="text-body-secondary">&#8377; &nbsp;{item.data.price}</small></p>
                    <button>
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
        Total : 1414
      </div>
    </div >
  );
};

export default Cart;
