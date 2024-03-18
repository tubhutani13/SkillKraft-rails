import { useState } from "react";
import api from '../../utils/api';
import "./SignUpForm.scss";
import SignupImage from "../../assets/collaboration.png";
import { Link } from "react-router-dom";
import VerificationModal from "../VerificationModal/VerificationModal";
import {
  containsLowercase,
  containsUppercase,
  containsDigit,
  containsSpecialCharacter,
  isLengthValid,
  isPasswordValid,
} from "../../utils/PasswordUtils";

function SignUpForm() {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "confirmPassword") {
      setPasswordMatch(formData.password === value);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid(formData.password)) {
      console.error("Password is not valid");
      return;
    }

    try {
      const response = await api.post("/signup", { user: formData });
      console.log(response.data);

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setPasswordMatch(true);
      if (response.status === 201) {
        setShowVerificationModal(true);
      }
    } catch (error) {
      setErrors(error.response.data.errors)
  
    }
  };

  const passwordEntered = formData.password.trim() !== "";

  return (
    <><div className="SignUpBackground"></div>
      <div className="SignUpContainer">
        <div className="SignupImageContainer" >
          <img src={SignupImage} alt="Signup-image" className="SignupImage" />
        </div>
        <div className="SignUpFormContainer">
        <form className="SignUpForm" onSubmit={handleSubmit}>
        <Link to="/" className='logo'>
            SKILLKRAFT
          </Link>
          <h2>Welcome to SkillKraft!!</h2>
          <div>
            <label htmlFor="name" required>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required />
          </div>
          {errors.name && <div className={`error ${errors ? '' : 'hidden'}`}>{'* name ' + errors.name}</div>}
          <div>
            <label htmlFor="username" required>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required />
          </div>
          {errors.username && <div className={`error ${errors ? '' : 'hidden'}`}>{'* Username ' + errors.username}</div>}
          <div>
            <label htmlFor="email" required>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>
          {errors.username && <div className={`error ${errors ? '' : 'hidden'}`}>{'* Email ' + errors.username}</div>}
          <div>
            <label htmlFor="password" required>
              Password:
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required />
              <label
                htmlFor="password"
                className="password-toggle"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </label>
            </div>
          </div>

          {passwordEntered && (
            <ul className="error-list">
              <li
                className={containsLowercase(formData.password) ? "valid" : "invalid"}
              >
                Must contain at least one lowercase letter
              </li>
              <li
                className={containsUppercase(formData.password) ? "valid" : "invalid"}
              >
                Must contain at least one uppercase letter
              </li>
              <li
                className={containsDigit(formData.password) ? "valid" : "invalid"}
              >
                Must contain at least one number
              </li>
              <li
                className={containsSpecialCharacter(formData.password)
                  ? "valid"
                  : "invalid"}
              >
                Must contain at least one symbol
              </li>
              <li
                className={isLengthValid(formData.password) ? "valid" : "invalid"}
              >
                Must be at least 8 characters long
              </li>
            </ul>
          )}
          <div>
            <label htmlFor="confirmPassword" required>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required />
          </div>
          {!passwordMatch && <div className={`error ${errors ? '' : 'hidden'}`}>Passwords do not match</div>}
          <button type="submit">Sign Up</button>
        </form>
        </div>
      </div>
      {showVerificationModal && <VerificationModal setShowVerificationModal={setShowVerificationModal}/>}</>
  );
}

export default SignUpForm;
