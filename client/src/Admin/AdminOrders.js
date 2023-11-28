import React, { useState, useEffect } from "react";
import AdminOrder from "./AdminOrder";

const AdminOrders = (token) => {
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
            <circle class="spinner_DupU" cx="12" cy="3" r="0" />
            <circle
              class="spinner_DupU spinner_GWtZ"
              cx="16.50"
              cy="4.21"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_n0Yb"
              cx="7.50"
              cy="4.21"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_dwN6"
              cx="19.79"
              cy="7.50"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_GIL4"
              cx="4.21"
              cy="7.50"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_46QP"
              cx="21.00"
              cy="12.00"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_DQhX"
              cx="3.00"
              cy="12.00"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_PD82"
              cx="19.79"
              cy="16.50"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_tVmX"
              cx="4.21"
              cy="16.50"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_eUgh"
              cx="16.50"
              cy="19.79"
              r="0"
            />
            <circle
              class="spinner_DupU spinner_j38H"
              cx="7.50"
              cy="19.79"
              r="0"
            />
            <circle class="spinner_DupU spinner_eUaP" cx="12" cy="21" r="0" />
          </svg>
        </div>
      ) : (
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
                            toggleVisibility={() =>
                              toggleVisibility(orderData._id)
                            }
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
      )}
    </>
  );
};

export default AdminOrders;
