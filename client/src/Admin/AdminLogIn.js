import React, { useState, useContext } from "react";
import DataAdmin from "../context/DataAdmin";

const AdminLogIn = ({ message }) => {
  const { handleLogin } = useContext(DataAdmin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <section className="adminLogInSection">
      <h3 style={{ marginBottom: 0, color: "var(--LINK-ACTIVE)" }}>Log in:</h3>
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
      {message && <p style={{ color: "red" }}>{message}</p>}
      <p>username: admin | password: admin</p>
    </section>
  );
};

export default AdminLogIn;
