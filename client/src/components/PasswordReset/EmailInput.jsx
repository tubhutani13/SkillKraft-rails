import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./EmailInput.scss";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/password_resets", { email });
      if (response.status === 200) {
        navigate("/new-password");
      } else {
        setError("An error occurred. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setError("Email not found.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <form className="EmailInputForm" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailInput;
