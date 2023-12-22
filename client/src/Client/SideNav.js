import React from "react";

const SideNav = ({ setMeatType }) => {
  const handleMeatTypeChange = (type) => {
    setMeatType(type);
  };

  return (
    <section className="sideNav">
      <div className="sideNav_h3" onClick={() => handleMeatTypeChange("")}>
        <h3>Proizvodi</h3>
      </div>
      <ul className="sideNav__ul">
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("piletina")}
        >
          <p className="sideNav__p">Piletina</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("svinjetina")}
        >
          <p className="sideNav__p">Svinjetina</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("junetina")}
        >
          <p className="sideNav__p">Junetina</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("govedina")}
        >
          <p className="sideNav__p">Govedina</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("teletina")}
        >
          <p className="sideNav__p">Teletina</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("suhomesnato")}
        >
          <p className="sideNav__p">Suhomesnato</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("mljeveno")}
        >
          <p className="sideNav__p">Mljeveno</p>
        </li>
        <li
          className="sideNav__li"
          onClick={() => handleMeatTypeChange("ostalo")}
        >
          <p className="sideNav__p">Ostalo</p>
        </li>
      </ul>
    </section>
  );
};

export default SideNav;
