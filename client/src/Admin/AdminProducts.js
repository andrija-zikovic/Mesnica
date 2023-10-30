import React, { useEffect, useState } from "react";

const AdminProducts = () => {
  const [adminPro, setAdminPro] = useState([]);
  const [showImage, setShowImage] = useState([]); // Use an array to track image visibility for each row
  const [produtsChange, setProductsChange] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

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
    fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CHANGE, {
      method: "POST",
      headers: {
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
        const res = await fetch(process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API);
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
  }, []);

  return (
    <div className="adminPro">
      <div className={`message ${message ? "visible" : "hidden"}`}>
        <button className="messageButton" onClick={() => setMessage("")}>
          X
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
                <button onClick={() => handleClick(index)}>Toggle Img</button>
                {showImage[index] && (
                  <img
                    className="adminProImg"
                    src={product.imgSrc}
                    alt={product.name}
                  />
                )}
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
