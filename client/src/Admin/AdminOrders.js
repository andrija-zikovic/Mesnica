import React, { useState, useEffect } from "react";
import AdminOrder from "./AdminOrder";

const AdminOrders = (token) => {
  const [adminOrd, setAdminOrd] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_ADMIN_GET_ORDERS, {
          method: 'GET', 
          headers: {
            Authorization: `Bearer ${token.token}`,
          }});
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          const ordersData = await res.json();
          setAdminOrd(ordersData);
        }
      } catch (error) {
        console.error("Error Fetching data:", error);
      }
    };

    if (shouldRefetch) {
      fetchData();
      setShouldRefetch(false); // Reset the flag after refetching
    }
  }, [token, shouldRefetch]);

  const [visibleOrders, setVisibleOrders] = useState([]);

  const toggleVisibility = (orderId) => {
    if (visibleOrders.includes(orderId)) {
      setVisibleOrders(visibleOrders.filter((id) => id !== orderId));
    } else {
      setVisibleOrders([...visibleOrders, orderId]);
    }
  };

  return (
    <div className="adminOrd">
      <h1 style={{ padding: "1rem" }}>Orders</h1>
      <table className="adminOrd__table">
        <thead className="adminOrd__thead">
          <tr>
            <th>Num</th>
            <th>Buyer</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="adminOrd__tbody">
          {adminOrd
            .slice()
            .reverse()
            .map((orderData, index) => (
              <React.Fragment key={orderData._id}>
                <tr
                  onClick={() => toggleVisibility(orderData._id)}
                  style={{
                    backgroundColor: orderData.status
                      ? "rgba(0, 128, 0, 0.574)"
                      : orderData.status === false
                      ? "rgba(255, 0, 0, 0.574)"
                      : "",
                  }}
                >
                  <td>{orderData.num}</td>
                  <td>{orderData.buyer.name}</td>
                  <td>{orderData.date}</td>
                  <td></td>
                </tr>
                {visibleOrders.includes(orderData._id) && (
                  <tr>
                    <td colSpan="4" className="adminOrd_td">
                      <AdminOrder
                        orderData={orderData}
                        toggleVisibility={() => toggleVisibility(orderData._id)}
                        setMessage={setMessage}
                        setShouldRefetch={setShouldRefetch}
                        token={token}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
        <tfoot className="adminOrd__tfoot">
          <tr>
            <td colSpan={7}>Data</td>
          </tr>
        </tfoot>
      </table>
      <div className={`message ${message ? "visible" : "hidden"}`}>
        <button className="messageButton" onClick={() => setMessage("")}>
          X
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AdminOrders;
