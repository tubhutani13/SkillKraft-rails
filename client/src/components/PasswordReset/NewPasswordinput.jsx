import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './NewPasswordInput.scss'
import api from '../../utils/api';
import useMessage from '../../hooks/useMessage';
import {
  containsLowercase,
  containsUppercase,
  containsDigit,
  containsSpecialCharacter,
  isLengthValid,
  isPasswordValid,
} from "../../utils/PasswordUtils";

const NewPasswordInput = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { password_reset_token } = useParams();
  const { handleMessage } = useMessage();
  const response_message = { data: {message: "Password Changed successfully" }}
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setPasswordMatch(password === value);
    }
  };
  const passwordEntered = password.trim() !== "";
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!isPasswordValid(password)) {
      console.error("Password is not valid");
      return;
    }
    try {
      await api.post(`/password-confirm/${password_reset_token}`,{
        user: {
        password: password,
        password_confirmation: confirmPassword
        }
      });
      handleMessage(response_message)
        navigate("/login", {
      });
    
    } catch (error) {
      console.error("Password Update failed:", error);
    }
  };

  return (
    <form className="NewPasswordInputForm" onSubmit={handleSubmit}>
      <input
        type="password"
        name="password"
        placeholder="Enter new password"
        value={password}
        onChange={handleChange}
        required
      />
      {passwordEntered && (
            <ul className="error-list">
              <li
                className={containsLowercase(password) ? "valid" : "invalid"}
              >
                Must contain at least one lowercase letter
              </li>
              <li
                className={containsUppercase(password) ? "valid" : "invalid"}
              >
                Must contain at least one uppercase letter
              </li>
              <li
                className={containsDigit(password) ? "valid" : "invalid"}
              >
                Must contain at least one number
              </li>
              <li
                className={containsSpecialCharacter(password)
                  ? "valid"
                  : "invalid"}
              >
                Must contain at least one symbol
              </li>
              <li
                className={isLengthValid(password) ? "valid" : "invalid"}
              >
                Must be at least 8 characters long
              </li>
            </ul>
          )}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={handleChange}
        required
      />
      {!passwordMatch && <div className="error">Passwords do not match</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewPasswordInput;
