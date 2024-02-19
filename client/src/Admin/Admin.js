import React, { useContext } from "react";
import DataAdmin from "../context/DataAdmin";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import AdminLogIn from "./AdminLogIn";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminStats from "./AdminStats";
import AddProducts from "./AddProducts";
import "./Admin.css";
import Loading from "../Client/Loading";

const Admin = () => {
  const {
    isLoggedIn,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
    message,
    logOut,
    handleKeyPress,
    loading,
  } = useContext(DataAdmin);

  return (
    <main className="adminMain">
      {isLoggedIn ? (
        <>
          <div className="nav__admin">
            <div className="adminNav__ul">
              <div
                className="adminLink__nav__dropdown"
                onClick={toggleDropdown}
                onKeyPress={(e) => handleKeyPress(e)}
                ref={dropdownRef}
                tabIndex={0}
              >
                Products
              </div>
              <div
                className={`dropdown ${isDropdownOpen ? "visible" : ""}`}
                onMouseLeave={toggleDropdown}
                aria-haspopup={true}
              >
                <div className="dropdown__li">
                  <Link to="/admin">List of products</Link>
                </div>
                <div className="dropdown__li">
                  <Link to="addProduct">Add product</Link>
                </div>
              </div>
              <div className="adminLink__nav">
                <Link to="adminorders">Orders</Link>
              </div>
              <div className="adminLink__nav">
                <Link to="adminstats">Stats</Link>
              </div>
              <div
                className="adminLink__nav_logOut"
                onClick={logOut}
                tabIndex={0}
                onKeyPress={(e) => handleKeyPress(e)}
              >
                Log out
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<AdminProducts />} />
            <Route path="/adminorders" element={<AdminOrders />} />
            <Route path="/adminstats" element={<AdminStats />} />
            <Route path="/addproduct" element={<AddProducts />} />
          </Routes>
          <Outlet />
        </>
      ) : (
        <AdminLogIn message={message} />
      )}
      {loading && <Loading className={"addProduct__loading"} />}
    </main>
  );
};

export default Admin;
