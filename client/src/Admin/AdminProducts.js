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
    // Toggle the visibility of the image for the clicked row
    const newShowImage = [...showImage]; // Create a copy of the array
    newShowImage[index] = !newShowImage[index]; // Toggle the value for the clicked row
    setShowImage(newShowImage); // Update the state
  };

  const handleProductsChangeSubmit = () => {
    console.log(produtsChange);
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
          // Reset the form inputs after successful submission
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
        // Handle errors if any
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API);
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
  }, [token]);

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

  return (
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
              <td>{product.title}</td>
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
                    <img
                      className="adminProImg"
                      src={product.imgSrc}
                      alt={product.name}
                    />
                     <label htmlFor='imgSrc'>Dodaj sliku</label>
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
  );
};

export default AdminProducts;
