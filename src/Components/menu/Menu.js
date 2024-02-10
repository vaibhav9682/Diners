import React, { useEffect, useState } from "react";
import Banner from "../../Assets/banner.png";
import star from "../../Assets/star.svg";
import Navbar from "../navbar/Navbar";
import db from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";


const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const url =
    process.env.REACT_APP_API_URL;
  const options = {
    method: "GET"

  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        var result = await response.json();
        setDishes(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const addToCart = async (data) => {
// eslint-disable-next-line
    const docRef = await addDoc(collection(db, "cart"), data);

  };
  // render = dishes
  const sortData = async (limit) => {



    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      var result = await response.json();
      if (limit === 0) {
        setDishes(result)

      } else {
        var newData = result.filter(function (dish) {
          return dish.price < limit;
        });
        setDishes(newData)
      }


      setLoading(false);
    } catch (error) {
      console.error(error);
    }



    // console.log(newData)
  }


  return (
    <div className="menu-cotainer">
      <Navbar />
      <div className="card banner">
        <img src={Banner} className="card-img" alt="..." />
      </div>

      <div className={loading ? "loader-container" : "loader-hide"}>
        <div className={loading ? "loader" : ""}></div>
      </div>

      <div className="dropdown" id="sort-list">
        <button className="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Sort by price
        </button>
        <ul className="dropdown-menu">
          <li onClick={() => sortData(0)} className="dropdown-item" >All </li>
          <li onClick={() => sortData(100)} className="dropdown-item" >Under &nbsp;&nbsp;&nbsp;&nbsp;100 &#8377;</li>
          <li onClick={() => sortData(150)} className="dropdown-item" >Under &nbsp;&nbsp;&nbsp;&nbsp;150 &#8377;</li>
          <li onClick={() => sortData(200)} className="dropdown-item" >Under &nbsp;&nbsp;&nbsp;&nbsp;200 &#8377;</li>
          <li onClick={() => sortData(250)} className="dropdown-item" >Under &nbsp;&nbsp;&nbsp;&nbsp;250 &#8377;</li>
        </ul>
      </div>

      <div className="dishes-list">
        {dishes.map(
          (dish, i) =>
          (
            <div className="card dish" style={{ width: "18rem" }} key={i}>
              <img
                src={dish.img}
                className="card-im-top"
                alt="..." g
              />
              <div className="card-body">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text">{dish.dsc}</p>
              </div>
              <ul className="list-group list-group-flush" >
                <li className="list-group-item ratings" >
                  <span className="stars">
                    {Array.from(
                      { length: dish.rate },
                      (_, index) => (
                        <span key={index}>
                          <img src={star} alt="star" />


                        </span>
                      )
                    )}
                  </span>
                  <span>
                    &#8377; &nbsp; {dish.price}
                  </span>
                </li>
                <li className="list-group list-group-flush">
                  <div className="card-body ">
                    <button
                      type="button"
                      className="btn btn-success book-btn"
                      onClick={() =>
                        addToCart({
                          id: dish.id,
                          name: dish.name,
                          img: dish.img,
                          price: dish.price,
                        })
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Menu;
