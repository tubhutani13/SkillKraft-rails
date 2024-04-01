import React from 'react';
import profilePicture from '../../assets/default-profile-image.png';
import './ProfileCard.scss'
import api from '../../utils/api';

function ProfileCard({ user }) {
  const { username, bio, name, profile_picture } = user;
  const handleConnect = async () => {
      try {
          const response = await api.post("/connection_requests", {username: username });
      } catch (error) {
          console.error("Error sending connection request:", error);
          // Optionally, handle error
      }
  };


    return (
        <div className="profile-card-container">
            <div className="profile">
            {profile_picture ? (
              <img src={profile_picture} alt="ProfileCard" className="profile-card-picture" />
            ) : (
              <img src={profilePicture} alt="Profile" className="profile-card-picture" />
            )}
                <div className="profile-card-details">
                    <h2 className='name'>{name}</h2>
                    <p className="bio">{bio}</p>
                </div>
            </div>
            <button className="connect-button" onClick={handleConnect}>
                <svg
                    className="connect-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="#fff" fillRule="evenodd" d="M6 1.25C3.37665 1.25 1.25 3.37665 1.25 6V18C1.25 20.6234 3.37665 22.75 6 22.75H18C20.6234 22.75 22.75 20.6234 22.75 18V6C22.75 3.37665 20.6234 1.25 18 1.25H6ZM10 6.25C8.48122 6.25 7.25 7.48122 7.25 9C7.25 10.5188 8.48122 11.75 10 11.75C11.5188 11.75 12.75 10.5188 12.75 9C12.75 7.48122 11.5188 6.25 10 6.25ZM5.25 17C5.25 14.3766 7.37665 12.25 10 12.25C12.6234 12.25 14.75 14.3766 14.75 17C14.75 17.4142 14.4142 17.75 14 17.75H6C5.58579 17.75 5.25 17.4142 5.25 17ZM17.5 9.25C17.9142 9.25 18.25 9.58579 18.25 10V10.75H19C19.4142 10.75 19.75 11.0858 19.75 11.5C19.75 11.9142 19.4142 12.25 19 12.25H18.25V13C18.25 13.4142 17.9142 13.75 17.5 13.75C17.0858 13.75 16.75 13.4142 16.75 13V12.25H16C15.5858 12.25 15.25 11.9142 15.25 11.5C15.25 11.0858 15.5858 10.75 16 10.75H16.75V10C16.75 9.58579 17.0858 9.25 17.5 9.25Z" clipRule="evenodd"></path>
                </svg>
                Connect
            </button>
        </div>
    );
}

export default ProfileCard;
