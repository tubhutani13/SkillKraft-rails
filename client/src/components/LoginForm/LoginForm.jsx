import { useState } from "react";
import api from '../../utils/api';
import useAuth from "../../hooks/useAuth";
import "./LoginForm.scss";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/collaboration.png";
import VerificationModal from "../VerificationModal/VerificationModal";

function LoginForm() {
  const { setToken } = useAuth();
  const [errors, setErrors] = useState('');
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hello');
    try {
      const response = await api.post("/login", formData);
      console.log(response.data);
      const token = response?.data?.token;
      setToken(token);
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.log("Email not verified. Displaying modal...");
        setShowVerificationModal(true);
      } else {
        setErrors(err.response.data.error);
        setTimeout(() => {
          setErrors("");
        }, 2000);
        console.log(err);
      }
    }
  };

  return (
    <><div className="LoginBackground"></div><div className="LoginContainer">
      <div className="LoginImageContainer">
        <img src={LoginImage} alt="Login-image" className="LoginImage" />
      </div>
      <div className="LoginFormContainer">
        <form className="LoginForm" onSubmit={handleSubmit}>
          <Link to="/" className='logo'>
            SKILLKRAFT
          </Link>
          <h2>Welcome back!</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
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
          {errors && <div className={`error ${errors ? '' : 'hidden'}`}>{errors}</div>}
          <div className="forgot-password-link">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    {showVerificationModal && <VerificationModal setShowVerificationModal={setShowVerificationModal}/>}</>
  );
}

export default LoginForm;
