import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useMessage from "../../hooks/useMessage";
import api from "../../utils/api";

const EmailVerify = () => {
  const { handleMessage } = useMessage();
  const { verification_token } = useParams();
  const navigate = useNavigate();
  const response_message = { data: {message: "Email verified successfully" }}

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.post(`/email-verify/${verification_token}`);
          handleMessage(response_message)
          navigate("/login", {
        });
      } catch (error) {
        console.error("Email verification failed:", error);
      }
    };

    verifyEmail();
  }, [verification_token, navigate]);

  return <p>Email Verified</p>;
};

export default EmailVerify;
