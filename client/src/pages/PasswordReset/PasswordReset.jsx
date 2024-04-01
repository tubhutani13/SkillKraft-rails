import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmailInput from '../../components/PasswordReset/EmailInput.jsx';
import NewPasswordInput from '../../components/PasswordReset/NewPasswordinput';

const PasswordResetPage = () => {
  return (
    <div>
      <h1>Password Reset</h1>
      <Routes>
        <Route path="/" element={<EmailInput />} />
        <Route path=":password_reset_token/new-password" element={<NewPasswordInput />} />
      </Routes>
    </div>
  );
};

export default PasswordResetPage;
