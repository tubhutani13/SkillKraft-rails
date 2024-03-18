import { useNavigate } from 'react-router-dom';
import './VerificationModal.scss';
import api from '../../utils/api';

const VerificationModal = ({ setShowVerificationModal }) => {
  const navigate = useNavigate();

  const handleOkayClick = () => {
    navigate('/login');
    setShowVerificationModal(false);
  };

  const handleResendClick = async () => {
    try {
      await api.post('/resend_verification_email');
    } catch (error) {
      console.error('Error resending verification email:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>Verification Email Sent</h2>
          <p>
            A verification email has been sent to your email address. Please check your inbox and follow the instructions to authenticate your account.
            {' '}
            <span className="resend-link" onClick={handleResendClick}>Click here</span>
            {' '}
            to resend verification mail.
          </p>
          <button className="buttonFilled" onClick={handleOkayClick}>Okay</button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
