import React, { useState, useEffect, useContext } from "react";
import DataAdmin from "../context/DataAdmin";
import AdminOrder from "./AdminOrder";
import Clock from "./Clock";
import Loading from "../Client/Loading";

const AdminOrders = () => {
  const { token, setReFetch } = useContext(DataAdmin);
  const [adminOrd, setAdminOrd] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [message, setMessage] = useState("");
  const [visibleOrders, setVisibleOrders] = useState([]);

  const toggleVisibility = (orderId) => {
    if (visibleOrders.includes(orderId)) {
      setVisibleOrders(visibleOrders.filter((id) => id !== orderId));
    } else {
      setVisibleOrders([...visibleOrders, orderId]);
    }
  };

  function handleKeyPress(event, orderId) {
    if (event.key === "Enter") {
      toggleVisibility(orderId);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_ADMIN_GET_ORDERS, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 403) {
          await setReFetch((prevState) => !prevState);
          const updateResponse = await fetchData();
          return updateResponse.json();
        } else if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          const ordersData = await res.json();
          setAdminOrd(ordersData);
          setShouldRefetch(false);
        }
      } catch (error) {
        console.error("Error Fetching data:", error);
      }
    };

    if (shouldRefetch) {
      fetchData();
      setShouldRefetch(false); // Reset the flag after refetching
    }
  }, [token, shouldRefetch, setReFetch]);

  return (
    <>
      {adminOrd.length < 1 ? (
        <Loading className={"loading"} />
      ) : (
        <div className="adminOrd">
          <div className="adminOrd__title">
            <h1>Orders</h1>
          </div>
          <section className="adminOrd__table">
            <div className="adminOrd__thead">
              <p>Num</p>
              <p>Time</p>
              <p>Buyer</p>
              <p>Date</p>
            </div>
            <div className="adminOrd__tbody">
              {adminOrd
                .slice()
                .reverse()
                .map((orderData, index) => (
                  <React.Fragment key={orderData._id}>
                    <div
                      onClick={() => toggleVisibility(orderData._id)}
                      className={`adminOrd__tbody_td ${
                        orderData.status
                          ? "status-true"
                          : orderData.status === null
                          ? "status-null"
                          : "status-false"
                      }`}
                      tabIndex={0}
                      onKeyPress={(e) => handleKeyPress(e, orderData._id)}
                    >
                      <p>{orderData.num}</p>
                      <p>
                        {(() => {
                          let word = orderData.date.split(" ");
                          return `${word[1]}`;
                        })()}
                      </p>
                      <p>{orderData.buyer.name}</p>
                      <p>
                        {(() => {
                          let word = orderData.date.split(" ");
                          return `${word[0]}`;
                        })()}
                      </p>
                    </div>
                    {visibleOrders.includes(orderData._id) && (
                      <AdminOrder
                        orderData={orderData}
                        toggleVisibility={() => toggleVisibility(orderData._id)}
                        setMessage={setMessage}
                        setShouldRefetch={setShouldRefetch}
                      />
                    )}
                  </React.Fragment>
                ))}
            </div>
            <div className="adminOrd__tfoot">
              <Clock />
            </div>
          </section>
          <div className={`message ${message ? "visible" : "hidden"}`}>
            <p>{message}</p>
            <button className="messageButton" onClick={() => setMessage("")}>
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
