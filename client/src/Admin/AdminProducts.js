import React, { useEffect, useState, useRef, useContext } from "react";
import DataAdmin from "../context/DataAdmin";
import Clock from "./Clock";
import Loading from "../Client/Loading";

const AdminProducts = () => {
  const { token } = useContext(DataAdmin);
  const [adminPro, setAdminPro] = useState([]);
  const [showEdit, setShowEdit] = useState([]); // Use an array to track image visibility for each row
  const [animation, setAnimation] = useState([]); // Use animation to trigger image visibility
  const [productsChange, setProductsChange] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [productDeleteInfo, setProductDeleteInfo] = useState();
  const [reFetchLocal, setReFetchLocal] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 403) {
          await setReFetchLocal((prevState) => !prevState);
          const updateResponse = await fetchData();
          return updateResponse.json();
        } else if (!res.ok) {
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
  }, [token, reFetchLocal, setReFetchLocal]);

  const filteredProducts = adminPro.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProductChange = (id, key, value) => {
    setProductsChange((prevState) => {
      const newState = { ...prevState };

      if (newState[id]) {
        newState[id] = { ...newState[id], [key]: value };
      } else {
        newState[id] = { [key]: value };
      }

      if (key === "price" && Number.isNaN(value)) {
        delete newState[id].price;
      } else if (key === "onStorage" && Number.isNaN(value)) {
        delete newState[id].onStorage;
      }

      if (newState[id] && Object.keys(newState[id]).length === 0) {
        delete newState[id];
      }

      return newState;
    });
  };

  const handleClearImage = (id) => {
    const newProductsChange = { ...productsChange };
    delete newProductsChange[id].image;
    if (
      newProductsChange[id] &&
      Object.keys(newProductsChange[id]).length === 0
    ) {
      delete newProductsChange[id];
    }

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

  const handleClickClose = (index) => {
    const newAnimation = [...animation];
    newAnimation[index] = true;
    setAnimation(newAnimation);
    setTimeout(() => {
      const newShowEdit = [...showEdit];
      newShowEdit[index] = false;
      setShowEdit(newShowEdit);
      const newAnimation = [...animation];
      newAnimation[index] = false;
      setAnimation(newAnimation);
    }, 500);
  };

  const handleProductsChangeSubmit = (id, index) => {
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
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) {
          setProductsChange((prevState) => {
            const newProductsChange = { ...prevState };
            delete newProductsChange[id];
            return newProductsChange;
          });
          setReFetchLocal(false);
          handleClickClose(index);
          return response.json();
        } else if (response.status === 403) {
          await setReFetchLocal((prevState) => !prevState);
          const updateResponse = await handleProductsChangeSubmit(id, index);
          return updateResponse.json();
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then(async (response) => {
        if (response.status === 403) {
          await setReFetchLocal((prevState) => !prevState);
          const updateResponse = await handleProductDelete(id);
          return updateResponse.json();
        } else if (!response.ok) {
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
      handleProductChange(id, "image", e.target.files[0]);
    }
  };

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
            <Clock />
          </div>
          {filteredProducts.length < 1 ? (
            <Loading className={"loading"} />
          ) : (
            <div className="adminPro__tbody">
              {filteredProducts.map((product, index) => (
                <div key={product._id} className="adminPro__tbody__tr">
                  <div className="adminPro__tbody__tr__Info">
                    <p>{index + 1}</p>
                    <p
                      className={`${product.title.length > 20 ? "resize" : ""}`}
                    >
                      {product.title.toUpperCase()}
                    </p>
                    <p>{product.meatType.toUpperCase()}</p>
                  </div>
                  <div className="adminPro__tbody__tr__Edit">
                    <div style={{ justifyContent: "center", gap: "0.5rem" }}>
                      <input
                        type="number"
                        name="price"
                        id={"price" + index}
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
                        id={"onStorage" + index}
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
                      {product.meatType === "other" ? " pcs" : " kg"}
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
                    <div
                      className={`adminProEdit ${
                        animation[index] ? "closing" : "opening"
                      }`}
                    >
                      <h2>Edit Product</h2>
                      <button
                        className="adminProImg_XButton"
                        onClick={() => handleClickClose(index)}
                      >
                        X
                      </button>
                      <div className="adminProEditInfo">
                        <div className="adminProEditInfo__title">
                          <label htmlFor="title">Name:</label>
                          <input
                            type="text"
                            name="title"
                            id={"title" + index}
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
                          <label htmlFor="meatType">Type:</label>
                          <select
                            name="meatType"
                            id={"meatType" + index}
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
                          <label htmlFor="description">Description:</label>
                          <textarea
                            name="description"
                            id={"description" + index}
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
                        {productsChange[product._id] &&
                        productsChange[product._id].image ? (
                          <img
                            src={
                              productsChange[product._id] &&
                              productsChange[product._id].image &&
                              URL.createObjectURL(
                                productsChange[product._id].image
                              )
                            }
                            alt="Crop preview"
                            className="adminProImg_img"
                          />
                        ) : (
                          <img
                            src={product.imgSrc}
                            alt={product.name}
                            className="adminProImg_img"
                          />
                        )}
                      </div>
                      <div className="adminProImgSrc">
                        <label htmlFor="imgSrc">Select new picture:</label>
                        <input
                          type="file"
                          name="imgSrc"
                          id={"imgSrc"}
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, product._id)}
                          ref={fileInputRef}
                          required
                        />
                        <div className="adminProImgSrcLabelAndClose">
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
                      </div>
                    </div>
                  )}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
