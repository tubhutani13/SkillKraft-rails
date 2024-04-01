import React from "react";
import PropTypes from "prop-types";
import "./InvitationCard.scss";
import api from "../../utils/api";

function InvitationCard({ user, id, sent, onUpdate }) {
  const { bio, name, profile_picture } = user;

  const handleAccept = async () => {
    try {
      await api.put(`/connection_requests/${id}`, { status: "accepted" });
      onUpdate(); // Call onUpdate function after accepting
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await api.put(`/connection_requests/${id}`, { status: "declined" });
      onUpdate(); // Call onUpdate function after declining
    } catch (error) {
      console.error("Error declining invitation:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await api.delete(`/connection_requests/${id}`);
      onUpdate(); // Call onUpdate function after withdrawing
    } catch (error) {
      console.error("Error withdrawing invitation:", error);
    }
  };

  return (
    <div className="invitation-card-container">
      <div className="invitation">
        <img
          src={profile_picture}
          alt="InvitationCard"
          className="invitation-card-picture"
        />
        <div className="invitation-card-details">
          <p>{name}</p>
          <p className="bio" title={bio}>{bio}</p>
        </div>
      </div>
      {sent ? (
        <div className="invitation-card-buttons">
          <button className="withdraw-button" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      ) : (
        <div className="invitation-card-buttons">
          <button className="accept-button" onClick={handleAccept}>
            Accept
          </button>
          <button className="decline-button" onClick={handleDecline}>
            Decline
          </button>
        </div>
      )}
    </div>
  );
}

InvitationCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  sent: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired, // onUpdate function prop
};

export default InvitationCard;
