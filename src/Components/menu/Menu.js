import React, { useEffect, useState } from "react";
import Banner from "../../Assets/banner.png";
import Logo from "../../Assets/Logo.svg";
import { Link } from "react-router-dom";
import star from "../../Assets/star.svg";
import Navbar from "../navbar/Navbar";
import db from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";


const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [cartList, setCartList] = useState("working")

  useEffect(() => {
    const url =
      "https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&tags=under_30_minutes";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "92b4b4ba66msh62e4f167fe8e25bp19c678jsn5c633361c92d",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        setDishes(result.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addToCart = async (data) => {

    const docRef = await addDoc(collection(db, "cart"), data);

  };


  return (
    <div className="menu-cotainer">
      <Navbar />
      <div className="card banner">
        <img src={Banner} class="card-img" alt="..." />
      </div>

      <div className={loading ? "loader-container" : "loader-hide"}>
        <div className={loading ? "loader" : ""}></div>
      </div>
      <div className="dishes-list">
        {dishes.map(
          (dish) =>
            dish.description && (
              <div className="card dish" style={{ width: "18rem" }}>
                <img
                  src={dish.thumbnail_url}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{dish.name}</h5>
                  <p className="card-text">{dish.description}</p>
                </div>
                <ul className="list-group list-group-flush" >
                  <li className="list-group-item" >
                    {Array.from(
                      { length: Math.floor(Math.random() * 5 + 1) },
                      (_, index) => (
                        <span>
                          <img src={star} alt="star" />
                        </span>
                      )
                    )}
                  </li>
                  <li className="list-group list-group-flush">
                    <div className="card-body ">
                      <button
                        type="button"
                        class="btn btn-success book-btn"
                        onClick={() =>
                          addToCart({
                            id: dish.id,
                            name: dish.name,
                            img: dish.thumbnail_url,
                            price: dish.price.total,
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
