import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPasswordInput.scss'

const NewPasswordInput = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password validation logic here
    // Navigate to the next step if passwords match and meet other criteria
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
