import React from "react";

const SideNav = ({ setMeatType }) => {
  const handleMeatTypeChange = (type) => {
    setMeatType(type);
  };

  return (
    <section className="sideNav">
      <div className="sideNav_h3" onClick={() => handleMeatTypeChange("")}>
        <h3>Products</h3>
      </div>
      <ul className="sideNav__ul">
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("chicken")}
        >
          <p className="sideNav__p">Chicken</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("pork")}
        >
          <p className="sideNav__p">Pork</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("baby beef")}
        >
          <p className="sideNav__p">Baby beef</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("beef")}
        >
          <p className="sideNav__p">Beef</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("veal")}
        >
          <p className="sideNav__p">Veal</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("dried")}
        >
          <p className="sideNav__p">Dried meat</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("ground")}
        >
          <p className="sideNav__p">Ground meat</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("other")}
        >
          <p className="sideNav__p">Other</p>
        </li>
      </ul>
    </section>
  );
};

export default SideNav;
