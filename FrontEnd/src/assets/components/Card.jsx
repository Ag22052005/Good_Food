import { useContext, useEffect, useState } from "react";
import axios from "axios";

function Card({ food }) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(Object.keys(food.options[0])[0]);
  const [price, setPrice] = useState(0);

  const foodId = food._id;
  const addToCart = (e) => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        `${import.meta.env.VITE_HOST_URL}/addCart`,
        {
          food: {
            foodId: foodId,
            option: {
              qty: qty,
              size: size,
              price: parseInt(food.options[0][size]),
            },
          },
        },{
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.items);
        setQty(1);
        setSize(Object.keys(food.options[0])[0]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Add to cart error !! ", err);
      });
  };

  useEffect(() => {
    setPrice(qty * parseInt(food.options[0][size]));
  }, [qty, size]);

  return (
    <div className="Card-box">
      <div
        className="card m-2 Card"
      >
        <img src={food.img} className="card-img-top cardImage" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{food.name}</h5>
          <p className="card-text mb-1">{food.description}</p>
          <div className="container d-flex w-100 my-2 px-0">
            <div className="me-auto d-flex" style={{ height: "2rem" }}>
              <select
                className="bg-white h-100 mx-1 "
                onChange={(e) => setQty(parseInt(e.target.value))}
                id="qty"
                value={qty}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option className="Card-option-qty"
                      key={i + 1}
                      value={i + 1}
                      onClick={() => {
                        setQty(i + 1);
                        document.getElementById("qty").value = qty;
                      }}
                    >
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                style={{ fontSize: "1rem" }}
                className="bg-white h-100 mx-1"
                onChange={(e) => setSize(e.target.value)}
                id="size"
                value={size}
              >
                {food.options.map((optionObj) => {
                  return Object.keys(optionObj).map((option) => (
                    <option
                      key={option}
                      value={option}
                      onClick={() => {
                        setSize(option);
                        document.getElementById("size").value = size;
                      }}
                    >
                      {option.toUpperCase()}
                    </option>
                  ));
                })}
              </select>
              {/* <select className="bg-white h-100 m-2" name="qty" id="qty">
              {food.options.map((optionObj) =>
                Object.keys(optionObj).map((option) => (
                  <option key={option} value={option}>
                    {option} - {optionObj[option]}
                  </option>
                ))
              )}
            </select> */}
            </div>
            <div className=" d-inline h-100 mx-1">
              <b>₹ {price}/- </b>{" "}
            </div>
          </div>
          <div className="addToCartbtn">
            <button className="btn btn-secondary" onClick={addToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
