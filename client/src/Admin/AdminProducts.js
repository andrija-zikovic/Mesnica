import React, { useEffect, useState, useRef, useContext } from "react";
import DataAdmin from "../context/DataAdmin";
import Clock from "./Clock";

const AdminProducts = () => {
  const { token } = useContext(DataAdmin);
  const [adminPro, setAdminPro] = useState([]);
  const [showEdit, setShowEdit] = useState([]); // Use an array to track image visibility for each row
  const [productsChange, setProductsChange] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [productDeleteInfo, setProductDeleteInfo] = useState();
  const [reFetch, setReFetch] = useState(false);
  const fileInputRef = useRef();

  const filteredProducts = adminPro.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProductChange = (id, key, value) => {
    if (productsChange[id]) {
      setProductsChange((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          [key]: value,
        },
      }));
    } else {
      setProductsChange((prevState) => ({
        ...prevState,
        [id]: {
          [key]: value,
        },
      }));
    }
  };

  const handleClearImage = (id) => {
    const newProductsChange = { ...productsChange };
    delete newProductsChange[id].image;
    setProductsChange(newProductsChange);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = (index) => {
    const initialShowEdit = Array(adminPro.length).fill(false);
    setShowEdit(initialShowEdit);
    const newShowEdit = [...showEdit];
    newShowEdit[index] = !newShowEdit[index];
    setShowEdit(newShowEdit);
  };

  const handleProductsChangeSubmit = (id, index) => {
    console.log(id);
    const formData = new FormData();

    formData.append("id", id);

    if (productsChange[id].price) {
      formData.append("price", productsChange[id].price);
    }
    if (productsChange[id].onStorage) {
      formData.append("onStorage", productsChange[id].onStorage);
    }
    if (productsChange[id].image) {
      formData.append("image", productsChange[id].image);
    }
    if (productsChange[id].title) {
      formData.append("title", productsChange[id].title);
    }
    if (productsChange[id].meatType) {
      formData.append("meatType", productsChange[id].meatType);
    }
    if (productsChange[id].description) {
      formData.append("description", productsChange[id].description);
    }

    fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setProductsChange((prevState) => {
            const newProductsChange = { ...prevState };
            delete newProductsChange[id];
            return newProductsChange;
          });
          setReFetch(!reFetch);
          handleClick(index);
          return response.json();
        }
        setMessage("Error while updating data!");
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("API response:", data);
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage(error);
      });
  };

  const handleProductDelete = (id) => {
    fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const updatedProducts = adminPro.filter(
          (product) => product._id !== id
        );
        setAdminPro(updatedProducts);
        setProductDeleteInfo();
        setMessage(response.message);
      })
      .catch((error) => {
        console.error("Error deleting product:", error.message);
        setMessage(error.message);
      });
  };

  const handleFileChange = (e, id) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      handleProductChange(id, "image", selectedImage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        } else {
          const productsData = await res.json();
          setAdminPro(productsData);
        }
      } catch (error) {
        console.error("Error Fetching data:", error);
      }
    };

    fetchData();
  }, [token.token, reFetch]);

  return (
    <>
      <div className="adminPro">
        {productDeleteInfo && (
          <div className="adminPro_delete">
            <p>
              Are you sure that you want to delete{" "}
              <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                {productDeleteInfo.title}
              </span>
              ?
            </p>
            <div className="adminPro_delete_buttons">
              <button onClick={() => handleProductDelete(productDeleteInfo.id)}>
                YES
              </button>
              <button onClick={() => setProductDeleteInfo()}>NO</button>
            </div>
          </div>
        )}
        <div className={`message ${message ? "visible" : "hidden"}`}>
          <p>{message}</p>
          <button className="messageButton" onClick={() => setMessage("")}>
            Ok
          </button>
        </div>
        <h1>Products</h1>
        <div className="adminProSearch">
          <label htmlFor="adminProSearchInput">Search : </label>
          <input
            type="search"
            id="adminProSearchInput"
            name="adminProSearchInput"
            className="adminProSearch_Input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          ></input>
        </div>
        <div className="adminPro__table">
          <div className="adminPro__thead">
            <p></p>
            <p>Name</p>
            <p>Type</p>
            <p>Price / kg</p>
            <p>On storage</p>
            <p></p>
            <p></p>
          </div>
          {filteredProducts.length < 1 ? (
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
            <div className="adminPro__tbody">
              {filteredProducts.map((product, index) => (
                <div>
                  <div key={product._id} className="adminPro__tbody__tr">
                    <p>{index + 1}</p>
                    <p
                      className={`${product.title.length > 20 ? "resize" : ""}`}
                    >
                      {product.title}
                    </p>
                    <p>{product.meatType}</p>
                    <div style={{ justifyContent: "center", gap: "0.5rem" }}>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder={product.price}
                        className="adminPro__input"
                        onChange={(e) =>
                          handleProductChange(
                            product._id,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                      ></input>
                      {" €"}
                    </div>
                    <div style={{ justifyContent: "center", gap: "0.5rem" }}>
                      <input
                        type="number"
                        name="onStorage"
                        id="onStorage"
                        placeholder={product.onStorage}
                        className="adminPro__input"
                        onChange={(e) =>
                          handleProductChange(
                            product._id,
                            "onStorage",
                            parseInt(e.target.value)
                          )
                        }
                      ></input>
                      {" kg"}
                    </div>
                    <div>
                      <button
                        className="adminPro__tbody__tr__img"
                        onClick={() => handleClick(index)}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        className="adminPro__tbody__tr_delete"
                        onClick={() =>
                          setProductDeleteInfo({
                            id: product._id,
                            title: product.title,
                          })
                        }
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                  {showEdit[index] && (
                    <div className="adminProEdit">
                      <h2>Edit Product</h2>
                      <button
                        className="adminProImg_XButton"
                        onClick={() => handleClick(index)}
                      >
                        X
                      </button>
                      <div className="adminProEditInfo">
                        <div className="adminProEditInfo__title">
                          <label htmlFor="title" className="offscreen">
                            Name:
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder={product.title}
                            onChange={(e) =>
                              handleProductChange(
                                product._id,
                                "title",
                                e.target.value
                              )
                            }
                          ></input>
                        </div>
                        <div className="adminProEditInfo__meatType">
                          <label htmlFor="meatType" className="offscreen">
                            Type:
                          </label>
                          <select
                            name="meatType"
                            id="meatType"
                            onChange={(e) =>
                              handleProductChange(
                                product._id,
                                "meatType",
                                e.target.value
                              )
                            }
                          >
                            <option value="pork">pork</option>
                            <option value="ground pork">ground pork</option>
                            <option value="baby beef">baby beef</option>
                            <option value="ground baby beef">
                              ground baby beef
                            </option>
                            <option value="veal">veal</option>
                            <option value="beef">beef</option>
                            <option value="chicken">chicken</option>
                            <option value="turkey">turkey</option>
                            <option value="other">other</option>
                          </select>
                        </div>
                        <div className="adminProEditInfo__description">
                          <label htmlFor="description" className="offscreen">
                            Description:
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            placeholder={
                              product.description
                                ? product.description
                                : "Opis..."
                            }
                            onChange={(e) =>
                              handleProductChange(
                                product._id,
                                "description",
                                e.target.value
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                      <div className="adminProImg">
                        <img
                          src={product.imgSrc}
                          alt={product.name}
                          className="adminProImg_img"
                        />
                        <div className="adminProImgSrc">
                          <div className="adminProImgSrcLabelAndClose">
                            <label htmlFor="imgSrc">Select new picture:</label>
                            {productsChange[product._id] &&
                              productsChange[product._id].image && (
                                <button
                                  className="adminProImg_RemoveButton"
                                  onClick={() => handleClearImage(product._id)}
                                >
                                  Remove
                                </button>
                              )}
                          </div>
                          {productsChange[product._id] &&
                            productsChange[product._id].image && (
                              <img
                                className="adminProImgSrc_img"
                                src={
                                  productsChange[product._id] &&
                                  productsChange[product._id].image
                                    ? URL.createObjectURL(
                                        productsChange[product._id].image
                                      )
                                    : ""
                                }
                                alt="new"
                              ></img>
                            )}
                          <input
                            type="file"
                            name="imgSrc"
                            id="imgSrc"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, product._id)}
                            ref={fileInputRef}
                            required
                          />
                        </div>
                      </div>
                      {productsChange[product._id] && (
                        <div className="adminPro__tbody__tr__ChangeConfirme">
                          <button
                            onClick={() =>
                              handleProductsChangeSubmit(product._id, index)
                            }
                          >
                            Confirem changes
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="adminPro__tfoot">
            <Clock />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
