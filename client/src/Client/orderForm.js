import { useState, useRef } from "react";
import "./orderForm.css";

const OrderForm = ({ cartItems, deleteItem, clearCart }) => {
  console.log(cartItems);
  const [buyStatus, setBuyStatus] = useState(false);
  const formRef = useRef(null);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  const toggleLoadingVisibility = () => {
    setIsLoadingVisible((prevState) => !prevState);
  };

  const handlePriceCaluclation = (cartItem) => {
    if (cartItem.unit === "dag") {
      return cartItem.quantity * cartItem.price;
    } else {
      return cartItem.quantity * cartItem.price;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    const formValues = {};
    formData.forEach((value, key) => {
      if (key === "fname" || key === "lname") {
        formValues["company"] = `${formData.get("fname")} ${formData.get(
          "lname"
        )}`;
      } else {
        formValues[key] = value;
      }
    });

    handleOrderSend(cartItems, formValues);
  };

  const handleOrderSend = async (cartItems, buyerData) => {
    setIsLoadingVisible(true);
    try {
      const url = process.env.REACT_APP_ORDER_CALL_API;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cartItems, buyer: buyerData }), // Send cartItems as JSON
      });
      if (res.ok) {
        setIsLoadingVisible(false);
        setBuyStatus(true);
        clearCart();
        const data = await res.json();
        console.log(data.message);
      }
    } catch (err) {
      console.error("Error giving order:", err);
    }
  };

  // Calculate the total price based on selectedUnit
  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, cartItem) => {
      return total + handlePriceCaluclation(cartItem);
    }, 0);

    return totalPrice.toFixed(2); // Rounds to two decimal places
  };

  if (buyStatus) {
    return (
      <main className="buyResOk">
        <h2>Račun je poslan na vašu email adresu!</h2>
        <br />
        <h2>Možete platiti odmah ili u poslovnici!</h2>
        <br />
        <h2>Dobiti će te potvrud na email kad vaša naruđba bude spremna!</h2>
        <br />
        <h2>Hvala!</h2>
      </main>
    );
  } else if (cartItems.length < 1) {
    return (
      <main
        className="order"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <h2 className="emptyMessage">Vaša košarica je prazna!</h2>
      </main>
    );
  } else {
    return (
      <main className="order">
        {isLoadingVisible && (
          <div className="orderLoading">
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
            <h1>Šaljem naruđbu!</h1>
          </div>
        )}
        <table className="order__table">
          <thead className="order__thead">
            <tr>
              <th colSpan={4}>
                <h3 style={{ marginBottom: 0 }}>Košarica</h3>
              </th>
            </tr>
            <tr>
              <th>Proizvod</th>
              <th>Cijena</th>
              <th>Količina</th>
              <th>Ukupno</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="order__tbody">
            {cartItems.map((cartItem, index) => (
              <tr key={index}>
                <td>{cartItem.description}</td>
                <td>
                  {cartItem.price}€{" /kg"}
                </td>
                <td>{cartItem.quantity.toFixed(2)} kg</td>
                <td>
                  {parseFloat(handlePriceCaluclation(cartItem)).toFixed(2)} €
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => deleteItem(cartItem.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="0.7em"
                      viewBox="0 0 384 512"
                    >
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="order__tfoot">
            <tr style={{ borderBottom: "none" }}>
              <td
                colSpan={3}
                style={{ textAlign: "right", paddingBottom: "0" }}
              >
                UKUPNO:
              </td>
              <td style={{ paddingBottom: "0" }}>{calculateTotalPrice()} €</td>
              <td style={{ paddingBottom: "0" }}></td>
            </tr>
            <tr
              style={{
                fontSize: "0.3rem",
                fontWeight: "normal",
                borderTop: "none",
              }}
            >
              <td
                colSpan={3}
                style={{
                  textAlign: "right",
                  paddingTop: "0",
                  fontWeight: "normal",
                }}
              >
                (1 € = 7.5345 HRK)
              </td>
              <td style={{ paddingTop: "0", fontWeight: "normal" }}>
                {(calculateTotalPrice() * 7.5345).toFixed(2)} kn
              </td>
              <td style={{ paddingTop: "0" }}></td>
            </tr>
          </tfoot>
        </table>
        <form
          ref={formRef}
          id="buyerInfo"
          className="buyerInfo"
          onSubmit={handleFormSubmit}
        >
          <h3 className="buyerInfo_Form">Vaše informacije:</h3>
          <label htmlFor="fname" className="offscreen">
            First Name
          </label>
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="Ime"
            className="buyerInfo__FirstName"
            required
            autoComplete="name"
          ></input>

          <label htmlFor="address" className="offscreen">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Adresa"
            className="buyerInfo_address"
            required
            autoComplete="street-address"
          ></input>

          <label htmlFor="lname" className="offscreen">
            Last Name
          </label>
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Prezime"
            className="buyerInfo__SecondName"
            required
            autoComplete="family-name"
          ></input>

          <label htmlFor="zip" className="offscreen">
            Zip
          </label>
          <input
            type="text"
            name="zip"
            id="zip"
            placeholder="Poštanski broj"
            className="buyerInfo_zip"
            required
            autoComplete="postal-code"
          ></input>

          <label htmlFor="email" className="offscreen">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="buyerInfo__email"
            required
            autoComplete="email"
          ></input>

          <label htmlFor="city" className="offscreen">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Grad"
            className="buyerInfo_city"
            required
            autoComplete="address-level2"
          ></input>

          <div className="orderButtons">
            <button className="clear" onClick={() => clearCart()}>
              Očisti
            </button>
            <button className="send" type="submit">
              Pošalji naruđbu
            </button>
          </div>
        </form>
      </main>
    );
  }
};

export default OrderForm;
