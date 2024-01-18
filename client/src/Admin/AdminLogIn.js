import React, { useState, useContext } from "react";
import DataAdmin from "../context/DataAdmin";

const AdminLogIn = () => {
  const { handleLogin } = useContext(DataAdmin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="adminLogIn">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="adminLogIn_username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="adminLogIn_password"
      />
      <button type="submit" className="adminLogIn_submit">
        Login
      </button>
    </form>
  );
};

export default AdminLogIn;
