import React, { useState, useCallback } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  /*function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }*/

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "/users/",
        { user: { name, email, password, password_confirmation } },
        {
          headers: { "X-CSRF-Token": csrfToken() /*getCookie("CSRF-TOKEN")*/ },
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log("An error occurred while creating new user: ", e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          required
        />

        <input
          type="password"
          placeholder="Password confirmation"
          value={password_confirmation}
          onChange={({ target: { value } }) => setPasswordConfirmation(value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
