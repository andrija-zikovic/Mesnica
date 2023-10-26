import React, { useState } from "react";

const AdminOrder = ({
  orderData,
  toggleVisibility,
  setMessage,
  setBackgroundColor,
}) => {
  const { _id, buyer, date, num, products, status } = orderData;

  const [orderStatus, setOrderStatus] = useState(status);

  const handleConfirme = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_ADMIN_ORDER_CONFIRM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });

      if (response.ok) {
        setOrderStatus(true);
        setBackgroundColor("Green");
        setMessage(`Order ${num} Confirmed!`);
        toggleVisibility();
      } else if (response.status === 400) {
        const errorResponse = await response.json();
        setMessage(errorResponse.error);
      } else {
        setMessage("Network response was not ok.");
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_ADMIN_ORDER_REJECT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });

      if (response.ok) {
        setOrderStatus(false);
        setBackgroundColor("Red");
        setMessage(`Order ${num} Rejected!`);
        toggleVisibility();
      } else if (response.status === 400) {
        const errorResponse = await response.json();
        setMessage(errorResponse.error);
      } else {
        setMessage("Network response was not ok.");
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="adminOrdDis">
      <div className="adminOrdDis__ButtonTop">
        <button onClick={toggleVisibility}>X</button>
      </div>
      <div className="adminOrdDis__head">
        <p>{buyer.name}</p>
        <p>{date}</p>
        <p style={{ fontWeight: "bold" }}>{num}</p>
      </div>
      <div className="adminOrdDis__products">
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product._id} className="product">
            <p>{product.description}</p>
            <p>{product.quantity} kg</p>
          </div>
        ))}
      </div>
      {orderStatus === true ? (
        <p
          style={{ fontWeight: "bold", backgroundColor: "var(--HERO-BGCOLOR)" }}
          className="adminOrdDis_message"
        >
          Order Confirmed!
        </p>
      ) : orderStatus === false ? (
        <p
          style={{ fontWeight: "bold", backgroundColor: "var(--BGCOLOR-FADE)" }}
          className="adminOrdDis_message"
        >
          Order Rejected!
        </p>
      ) : (
        <div className="adminOrdDis__ButtonBottom">
          <button onClick={handleConfirme}>Confirm</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
