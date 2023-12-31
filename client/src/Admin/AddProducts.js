import React, { useState } from "react";

const AddProducts = (token) => {
  const [message, setMessage] = useState("");

  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    onStorage: "",
    meatType: "",
    image: null,
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_ADMIN_PRODUCTS_CALL_API;
      const formData = new FormData();
      formData.append("title", productInfo.title);
      formData.append("price", productInfo.price);
      formData.append("onStorage", productInfo.onStorage);
      formData.append("meatType", productInfo.meatType);
      formData.append("image", productInfo.image);

      const req = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        body: formData,
      });
      if (req.ok) {
        console.log("Product Added");
        e.target.reset();
        setMessage("Proizvod je dodan!");
      } else {
        console.error("Failed to add product:", req.status, req.statusText);
        setMessage(`Proizvod nije dodan! ${req.status} ${req.statusText}`);
      }
    } catch (err) {
      console.error("Error giving product:", err);
      setMessage(`Proizvod nije dodan! ${err}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setProductInfo({ ...productInfo, image: selectedImage });
    }
  };

  return (
    <section className="addProducts">
      <h2>Dodaj Proizvod</h2>
      <form id="addProForm" className="addProForm" onSubmit={handleAddSubmit}>
        <label htmlFor="title" className="offscreen">
          Name
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Ime"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="price" className="offscreen">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Cijena"
          step="0.01"
          min={0}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="onStorage" className="offscreen">
          On storage
        </label>
        <input
          type="number"
          name="onStorage"
          id="onStorage"
          placeholder="Na stanju"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="meatType" className="offscreen">
          Meat type
        </label>
        <input
          type="text"
          name="meatType"
          id="meatType"
          placeholder="Vrsta mesa"
          onChange={handleInputChange}
          required
        />
        <div className="imgForm">
          <label htmlFor="imgSrc">Dodaj sliku</label>
          <input
            type="file"
            name="imgSrc"
            id="imgSrc"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="addButton">
          <button className="add" type="submit">
            DODAJ
          </button>
        </div>
      </form>
      {message && <p className="addProMessage">{message}</p>}
    </section>
  );
};

export default AddProducts;
