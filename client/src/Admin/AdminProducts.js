import React, { useEffect, useState } from "react";

const AdminProducts = (token) => {
  const [adminPro, setAdminPro] = useState([]);
  const [showImage, setShowImage] = useState([]); // Use an array to track image visibility for each row
  const [produtsChange, setProductsChange] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [productDeleteInfo, setProductDeleteInfo] = useState();

  const filteredProducts = adminPro.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProductChange = (id, key, value) => {
    if (produtsChange[id]) {
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

  const handleClick = (index) => {
    const initialShowImage = Array(adminPro.length).fill(false);
    setShowImage(initialShowImage);
    const newShowImage = [...showImage]; 
    newShowImage[index] = !newShowImage[index]; 
    setShowImage(newShowImage); 
  };

  const handleProductsChangeSubmit = () => {
    fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtsChange),
    })
      .then((response) => {
        if (response.ok) {
          setProductsChange({});
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
      body: JSON.stringify({id: id}),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedProducts = adminPro.filter((product) => product._id !== id);
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
        handleProductChange(id, 'image', selectedImage);
    }
  }

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
  }, [token.token]);

  return (
    <>
    { filteredProducts.length < 1 ? ( 
      <div className='loading'>
        <svg width="100" height="80" fill='#e33535cc' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <circle className="spinner_DupU" cx="12" cy="3" r="0"/>
            <circle className="spinner_DupU spinner_GWtZ" cx="16.50" cy="4.21" r="0"/>
            <circle className="spinner_DupU spinner_n0Yb" cx="7.50" cy="4.21" r="0"/>
            <circle className="spinner_DupU spinner_dwN6" cx="19.79" cy="7.50" r="0"/>
            <circle className="spinner_DupU spinner_GIL4" cx="4.21" cy="7.50" r="0"/>
            <circle className="spinner_DupU spinner_46QP" cx="21.00" cy="12.00" r="0"/>
            <circle className="spinner_DupU spinner_DQhX" cx="3.00" cy="12.00" r="0"/>
            <circle className="spinner_DupU spinner_PD82" cx="19.79" cy="16.50" r="0"/>
            <circle className="spinner_DupU spinner_tVmX" cx="4.21" cy="16.50" r="0"/>
            <circle className="spinner_DupU spinner_eUgh" cx="16.50" cy="19.79" r="0"/>
            <circle className="spinner_DupU spinner_j38H" cx="7.50" cy="19.79" r="0"/>
            <circle className="spinner_DupU spinner_eUaP" cx="12" cy="21" r="0"/>
        </svg>
      </div>
    ) : ( 
      <div className="adminPro">
        {productDeleteInfo && (
          <div className="adminPro_delete">
            <p>Jeste li sigurni da zelite izbrisati proizvod <span style={{fontWeight: 'bold', whiteSpace: 'nowrap'}}>{productDeleteInfo.title}</span>?</p>
            <div className="adminPro_delete_buttons">
              <button onClick={() => handleProductDelete(productDeleteInfo.id)}>DA</button>
              <button onClick={() => setProductDeleteInfo()}>NE</button>
            </div>
          </div>
        )}
        <div className={`message ${message ? "visible" : "hidden"}`}>
          <button className="messageButton" onClick={() => setMessage("")}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
          <p>{message}</p>
        </div>
        <h1 style={{ padding: "1rem" }}>Products</h1>
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
        <table className="adminPro__table">
          <thead className="adminPro__thead">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Meat</th>
              <th>Price/kg</th>
              <th>On Storage</th>
              <th>IMG</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="adminPro__tbody">
            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td className={`${product.title.length > 30 ? 'resize' : ''}`}>{product.title}</td>
                <td>{product.meatType}</td>
                <td>
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
                  ></input>{" "}
                  €
                </td>
                <td>
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
                  ></input>{" "}
                  kg
                </td>
                <td>
                  <button onClick={() => handleClick(index)}>Slika</button>
                  {showImage[index] && (
                    <div className="adminProImg">
                      <div className="adminProImg_close">
                        <button onClick={() => handleClick(index)}>X</button>
                      </div>
                      <img
                        src={product.imgSrc}
                        alt={product.name}
                      />
                      <label htmlFor='imgSrc'>Odaberi novu sliku:</label>
                      <input type='file' name='imgSrc' id='imgSrc' accept='image/*'
                          onChange={(e) => handleFileChange(e, product._id)} required />
                    </div>
                  )}
                </td>
                <td>
                  <button style={{backgroundColor: 'rgba(255, 0, 0, 0.574)', padding: '0.1rem 0.1rem'}} onClick={() => setProductDeleteInfo({id: product._id, title: product.title})}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="adminPro__tfoot">
            <tr>
              <td colSpan={7}>
                <button onClick={handleProductsChangeSubmit}>
                  SUBMIT CHANGES
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )}
    </>
  );
};

export default AdminProducts;
