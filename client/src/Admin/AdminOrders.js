import React, { useState, useEffect, useContext } from "react";
import DataAdmin from "../context/DataAdmin";
import AdminOrder from "./AdminOrder";
import Clock from "./Clock";

const AdminOrders = () => {
  const { token } = useContext(DataAdmin);
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
            Authorization: `Bearer ${token.token}`,
          },
        });
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

  return (
    <>
      {adminOrd.length < 1 ? (
        <div className="loading">
          <svg
            width="100"
            height="80"
            fill="#e33535cc"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>
              {`
                .spinner_DupU {
                    animation: spinner_sM3D 1.2s infinite;
                }
                .spinner_GWtZ { animation-delay: .1s; }
                .spinner_dwN6 { animation-delay: .2s; }
                .spinner_46QP { animation-delay: .3s; }
                .spinner_PD82 { animation-delay: .4s; }
                .spinner_eUgh { animation-delay: .5s; }
                .spinner_eUaP { animation-delay: .6s; }
                .spinner_j38H { animation-delay: .7s; }
                .spinner_tVmX { animation-delay: .8s; }
                .spinner_DQhX { animation-delay: .9s; }
                .spinner_GIL4 { animation-delay: 1s; }
                .spinner_n0Yb { animation-delay: 1.1s; }
                
                @keyframes spinner_sM3D {
                    0%, 50% { animation-timing-function: cubic-bezier(0, 1, 0, 1); r: 0; }
                    10% { animation-timing-function: cubic-bezier(.53, 0, .61, .73); r: 2px; }
                }
            `}
            </style>
            <circle className="spinner_DupU" cx="12" cy="3" r="0" />
            <circle
              className="spinner_DupU spinner_GWtZ"
              cx="16.50"
              cy="4.21"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_n0Yb"
              cx="7.50"
              cy="4.21"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_dwN6"
              cx="19.79"
              cy="7.50"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_GIL4"
              cx="4.21"
              cy="7.50"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_46QP"
              cx="21.00"
              cy="12.00"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_DQhX"
              cx="3.00"
              cy="12.00"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_PD82"
              cx="19.79"
              cy="16.50"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_tVmX"
              cx="4.21"
              cy="16.50"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_eUgh"
              cx="16.50"
              cy="19.79"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_j38H"
              cx="7.50"
              cy="19.79"
              r="0"
            />
            <circle
              className="spinner_DupU spinner_eUaP"
              cx="12"
              cy="21"
              r="0"
            />
          </svg>
        </div>
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
            <button className="messageButton" onClick={() => setMessage("")}>
              X
            </button>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
