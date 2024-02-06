import { createContext, useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

const DataAdmin = createContext({});

export const DataAdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState("");
  const dropdownRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const url = process.env.REACT_APP_LOGIN;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        Cookies.set("jwt", response.headers.get("set-cookie"));
        const { accessToken } = await response.json();
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
        setIsLoggedIn(true); // Set isLoggedIn to true if the response is positive
      } else {
        // Handle authentication failure, show error message, etc.
        const errorResponse = await response.json();
        setMessage(errorResponse.error);
        console.error("Authentication failed");
      }
    } catch (error) {
      // Handle network errors, server errors, etc.
      console.error("Error occurred during login:", error);
    }
  };

  const logOut = async () => {
    try {
      const url = process.env.REACT_APP_LOGOUT;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /* const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  }; */

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.className === "link__nav_logOut") {
        logOut();
      } else if (e.target.className === "link__nav__dropdown") {
        toggleDropdown();
      }
    }
  };

  useEffect(() => {
    const refreshTokens = async () => {
      try {
        const refreshResponse = await fetch(process.env.REACT_APP_REFRESH, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (refreshResponse.ok) {
          const { accessToken } = await refreshResponse.json();
          localStorage.setItem("token", accessToken);
          setToken(accessToken);
          setIsLoggedIn(true);
          console.log("Tokens refreshed successfully");
        } else {
          // Handle refresh failure
          setIsLoggedIn(false);
          console.error("Token refresh failed");
        }
      } catch (error) {
        // Handle network errors, server errors, etc.
        console.error("Error occurred during token refresh:", error);
      }
    };

    refreshTokens();
  }, [reFetch, token]);

  return (
    <DataAdmin.Provider
      value={{
        isLoggedIn,
        isDropdownOpen,
        token,
        toggleDropdown,
        dropdownRef,
        message,
        logOut,
        handleLogin,
        handleKeyPress,
        loading,
        setLoading,
        reFetch,
        setReFetch,
      }}
    >
      {children}
    </DataAdmin.Provider>
  );
};

export default DataAdmin;
