import React from "react";

const SideNav = ({ setMeatType, showSideNav, setShowSideNav }) => {
  const handleMeatTypeChange = (type) => {
    setMeatType(type);
  };

  if (window.innerWidth > 992) {
    return (
      <section className="sideNav">
        <div className="sideNav_h3" onClick={() => handleMeatTypeChange("")}>
          <h3 onClick={() => handleMeatTypeChange("")}>Products</h3>
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
  } else {
    return (
      <section
        className="sideNav"
        style={{ left: `${showSideNav ? "0" : "-200px"}` }}
      >
        <div className="sideNav_h3" onClick={() => handleMeatTypeChange("")}>
          <h3 onClick={() => handleMeatTypeChange("")}>Products</h3>
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
        <div
          className="sideNav_arrow"
          onClick={() => setShowSideNav((prevState) => !prevState)}
        >
          {showSideNav ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          )}
        </div>
      </section>
    );
  }
};

export default SideNav;
