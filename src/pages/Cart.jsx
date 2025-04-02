import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeFromCart } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(cart.reduce((sum, product) => sum + product.totalPrice, 0));
    } else {
      setTotal(0);
    }
  }, [cart]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async () => {
    if (total === 0) {
      alert("Total amount must be greater than zero!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/orders", {
        amount: total * 100,
        currency: "INR",
      });

      handleRazorpayScreen(data.amount);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_eTGgLQ7CcrzRHA",
      amount: amount,
      currency: "INR",
      name: "Kingstar Studios",
      description: "Payment to Kingstar Studios",
      image: "https://yt3.googleusercontent.com/aosZQmrK_CgSq3yhUBL5kPQ0Psg3f9i5CDPVkOjxBemUl2OHCUpoKw6V8BOiYBQDWFqVI6jH=s900-c-k-c0x00ffffff-no-rj",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "itsriyas.dev",
        email: "mohamedriyas.dev@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        {cart.length > 0 ? (
          <div className="row mt-5">
            {/* Cart Items */}
            <div className="col-lg-7 col-md-12">
              <table className="table shadow table-responsive">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.title}</td>
                      <td>
                        <img style={{ width: "80px", height: "80px" }} src={product.thumbnail} alt={product.title} />
                      </td>
                      <td>
                        <input type="text" value={product.quantity} readOnly className="form-control text-center" style={{ width: "50px" }} />
                      </td>
                      <td>${product.totalPrice}</td>
                      <td>
                        <button className="btn" onClick={() => dispatch(removeFromCart(product.id))}>
                          <i className="fa-solid fa-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex flex-wrap justify-content-between mt-3">
                <button className="btn btn-outline-warning mb-2" onClick={() => dispatch(emptyCart())}>
                  Empty Cart
                </button>
                <Link to={"/"} className="btn btn-outline-primary mb-2">
                  Shop More
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="col-lg-4 col-md-12 mt-4">
              <div className="border rounded shadow p-4">
                <h1>Cart Summary</h1>
                <h4>Total Products: {cart.length}</h4>
                <h5>
                  Total: <span className="text-danger fw-bolder">${total}</span>
                </h5>
              </div>
              <div className="d-grid mt-3">
                <button className="btn btn-success rounded" onClick={createRazorpayOrder}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mt-5 text-center">
            <h1 className="text-danger">Your Cart is empty...</h1>
            <img src="https://via.placeholder.com/300" alt="Empty Cart" className="img-fluid mt-3" />
            <div className="mt-3">
              <Link to="/" className="btn btn-primary">Go Shopping</Link>
            </div>
          </div>
        )}
      </div>
      {responseId && <p className="ms-2"> Order Id : {responseId}</p>}
    </>
  );
}

export default Cart;
