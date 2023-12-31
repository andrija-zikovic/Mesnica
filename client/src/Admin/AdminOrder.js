import React, { useState } from "react";

const AdminOrder = ({
  orderData,
  toggleVisibility,
  setMessage,
  setShouldRefetch,
  token
}) => {
  const { _id, buyer, date, num, products, status } = orderData;

  const [orderStatus, setOrderStatus] = useState(status);
  const [checkedProducts, setCheckedProducts] = useState([]);

  const toggleCheck = (productId) => {
    setCheckedProducts((prevCheckedProducts) => {
      if (prevCheckedProducts.includes(productId)) {
        return prevCheckedProducts.filter((id) => id !== productId);
      } else {
        return [...prevCheckedProducts, productId];
      }
    });
  };

  const handleConfirme = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_ADMIN_ORDER_CONFIRM, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });

      if (response.ok) {
        setOrderStatus(true);
        setShouldRefetch(true);
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
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });

      if (response.ok) {
        setOrderStatus(false);
        setShouldRefetch(true);
        setMessage(`Order ${num} Rejected!`);
        toggleVisibility(_id);
      } else if (response.status === 400) {
        const errorResponse = await response.json();
        setMessage(errorResponse.error);
      } else {
        setMessage("Došlo je do problema, pokušaje te ponovo.");
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
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
          <div key={product._id} className={`product ${checkedProducts.includes(product._id) ? 'checked' : ''} ${status === 'null' ? '' : 'done'}`}>
          <p className={`productTitle ${product.description.length > 20 ? 'ordResize' : ''}`}>{product.description}</p>
          <p>{product.quantity} kg</p>
          {status || !status ? null : (
          <button
            name={checkedProducts.includes(product._id) ? "checked" : "check"}
            onClick={() => toggleCheck(product._id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" fill="green" viewBox="0 0 512 512">
              {checkedProducts.includes(product._id) ? (
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              ) : (
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              )}
            </svg>
          </button>
        )}
        </div>
        ))}
      </div>
      {orderStatus === true ? (
        <p
          style={{ fontWeight: "bold", backgroundColor: "var(--HERO-BGCOLOR)" }}
          className="adminOrdDis_message"
        >
          Naruđba potvrđena!
        </p>
      ) : orderStatus === false ? (
        <p
          style={{ fontWeight: "bold", backgroundColor: "var(--BGCOLOR-FADE)" }}
          className="adminOrdDis_message"
        >
          Naruđba odbijena!
        </p>
      ) : (
        <div className="adminOrdDis__ButtonBottom">
          <button onClick={handleConfirme}>Potvrid</button>
          <button onClick={handleReject}>Odbaci</button>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
