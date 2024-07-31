import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserInfo } from "../../store/store";
import {useNavigate } from "react-router-dom";
function CheckOut() {
  const navigate = useNavigate()
  const [offer, setOffer] = useState(0);
  const [billItems, setBillItems] = useState({
    price: 200,
    deliveryCharge: 50,
    tax: 2,
    discount: offer,
  });
  const [totalPrice, setTotalPrice] = useState(
    billItems.deliveryCharge + billItems.price * (1 + billItems.tax / 100)
  );
  const [cartItems,setCartItems] = useState([])

  const { USER_ID } = useContext(UserInfo);

  const handleOfferChange = (event) => {
    const newOffer = Number(event.target.value);
    setOffer(newOffer);
    setBillItems((b) => ({ ...b, discount: newOffer }));
  };

  const userInfoChangeHandler = (e) => {
    const target = e.target;
    const textBox = target.previousElementSibling;
    if (target.textContent === "Change") {
      textBox.removeAttribute("readOnly");
      textBox.value = "";
      textBox.placeholder = `Enter ${textBox.previousElementSibling.textContent} `;
      target.textContent = "Save";
    } else {
      const k = textBox.previousElementSibling.textContent.toLowerCase().trim();
      const v = textBox.value;
      const payload = {
        [k]: v,
      };
      axios
        .post("https://good-food-rkxe.onrender.com/updateUser", { userId: USER_ID, payload })
        .then((res) => {
          console.log("updated ", res.data);
          textBox.value = res.data[k];
          textBox.readOnly = true;
          target.textContent = "Change";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const userInfoHandler = (user) => {
    document.getElementById("name").value = user.name;
    document.getElementById("location").value = user.location;
    if (!user.mobile) {
      document.getElementById("mobile").placeholder = "Enter the phone Number";
      document.getElementById("mobilebtn").textContent = "Save";
      document.getElementById("mobile").removeAttribute("readOnly");
    } else {
      document.getElementById("mobile").value = user.mobile;
    }
  };
  const handlePayment = async () => {
    try {
        const response = await axios.post('https://good-food-rkxe.onrender.com/order', {
            amount: totalPrice
        });
        const data = response.data;
        console.log(data);

        // Call the handlePaymentVerify function with the data
        handlePaymentVerify(data.data);
    } catch (error) {
        console.log(error);
    }
};

// handlePaymentVerify Function
const handlePaymentVerify = async (data) => {
    const options = {
        key: 'rzp_test_lkVYkbv1AqmyMF',
        amount: data.amount,
        currency: data.currency,
        name: "Ashish",
        description: "Test Mode",
        order_id: data.id,
        handler: async (response) => {
            console.log("response", response);
            const itemsName = cartItems.map((item) => {
              return item.name;
            });
            
            try {
                const res = await axios.post('https://good-food-rkxe.onrender.com/verify', {
                  userId:USER_ID,
                  itemsName,
                  price:totalPrice,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                }).then((res)=>{
                  console.log(res)
                  navigate('/')
                })
            } catch (error) {
                console.log(error);
            }
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
};










  useEffect(() => {
    axios
      .post("http://localhost:3000/getUserInfo", { userId: USER_ID })
      .then((res) => {
        userInfoHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://localhost:3000/getCartPrice", { userId: USER_ID })
      .then((res) => {
        const items = res.data.items;
        setCartItems(items)
        const price = items.reduce((initial, item) => {
          return initial + item.option.qty * item.option.price;
        }, 0);
        setBillItems((b) => ({ ...b, price }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setTotalPrice(
      billItems.deliveryCharge +
        billItems.price +
        (billItems.price * billItems.tax) / 100 -
        (billItems.price * billItems.discount) / 100
    );
    // console.log(totalPrice);
  }, [billItems]);

  return (
    <div className="container w-50 border">
      <div className="w-75">
        <div className="d-flex w-100 justify-content-between m-2">
          <label className="form-label w-25">Name </label>
          <input type="text" className="form-control w-50" id="name" readOnly />
          <button
            className="btn border fw-bolder"
            style={{ width: "14%" }}
            onClick={(e) => userInfoChangeHandler(e)}
          >
            Change
          </button>
        </div>
        <div className=" d-flex w-100 justify-content-between m-2">
          <label htmlFor="exampleInputPassword1" className="form-label w-25">
            Mobile
          </label>
          <input
            type="text"
            className="form-control w-50"
            id="mobile"
            readOnly
          />
          <button
            className="btn border fw-bolder"
            style={{ width: "14%" }}
            id="mobilebtn"
            onClick={(e) => userInfoChangeHandler(e)}
          >
            Change
          </button>
        </div>
        <div className="d-flex w-100 justify-content-between m-2">
          <label className="form-label w-25">Location</label>
          <input
            type="text"
            className="form-control w-50"
            id="location"
            readOnly
          />
          <button
            className="btn border fw-bolder"
            style={{ width: "14%" }}
            onClick={(e) => userInfoChangeHandler(e)}
          >
            Change
          </button>
        </div>
      </div>
      <center className="w-100 bg-dark" style={{ height: "1px" }}></center>
      <div className="w-100 m-4 p-1 d-flex">
        <div className="w-75 d-flex align-items-center">
          <h5 className="m-0">OFFERS:</h5>
          <select
            id="offer"
            className="h-100 mx-3"
            style={{ width: "40%" }}
            value={offer}
            onChange={handleOfferChange}
          >
            <option value={0}>Select coupon</option>
            <option value={50}>USER-50</option>
            <option value={75}>NEWUSER-75</option>
            <option value={20}>GoFood</option>
          </select>
        </div>
        <h5>
          {offer !== 0 ? <b>😊</b> : <b>😔</b>} {offer}% OFF
        </h5>
      </div>
      <center className="w-100 bg-dark" style={{ height: "1px" }}></center>
      <div className="w-100">
        <center className="fw-bold" style={{'fontSize':'1.4rem'}}>Bill</center>
        <div className=" border">
          <div className="w-100 p-4 d-flex justify-content-between">
            <div className="w-100">
              {Object.keys(billItems).map((key) => {
                return (
                  <div key={key} className="w-100 d-flex ">
                    <h5 className="w-50" style={{}}>
                      {key.toUpperCase()} :
                    </h5>
                    <h5 className="w-50" style={{ textAlign: "end" }}>
                      {key === "discount" ? "-" : "+"}
                      {key === "discount" || key === "tax"
                        ? (billItems.price * billItems[key]) / 100
                        : billItems[key]}{" "}
                      ₹
                    </h5>
                  </div>
                );
              })}
            </div>
          </div>
          <center className="bg-dark m-auto" style={{ height: "1px",width:'90%' }}></center>
          <div className="w-100 d-flex p-4">
            <h5 className="fw-bolder w-50" style={{'fontSize':'1.5rem'}}>
              Total Price : 
            </h5>
            <h5 className="w-50" style={{ textAlign: "end" }}>
              ₹ {totalPrice}
            </h5>
          </div>
        </div>
      </div>
      <div
            className="container border w-100 d-flex align-items-center bg-white flex-row-reverse p-0"
            style={{ position: "sticky", bottom: "0px", height: "4rem" }}
          >
            <button
              className="border bg-primary h-100 text-white"
              style={{ float: "right" }}
              onClick={handlePayment}
            >
              Proceed To Pay {">"}
            </button>
          </div>
    </div>
  );
}

export default CheckOut;
