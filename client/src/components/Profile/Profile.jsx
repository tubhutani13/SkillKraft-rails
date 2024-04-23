import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Profile.scss";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import profilePicture from "../../assets/default-profile-image.png";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import useMessage from "../../hooks/useMessage";

function Profile({ user, setUser, skills, isCurrentUserProfile }) {
  const { handleMessage } = useMessage();
  let navigate = useNavigate();
  const {
    username,
    email,
    name,
    bio,
    learning_skill_ids,
    expert_skill_ids,
    profile_picture,
  } = user;
  const [editProfile, setEditProfile] = useState(false);

  const displaySkills = (selectedSkills) => {
    return skills
      .filter((skill) => selectedSkills.includes(skill.id))
      .map((skill) => (
        <div key={skill.id} className="skill-tag">
          <span className="text">{skill.name}</span>
        </div>
      ));
  };

  const handleConnect = async () => {
    try {
      const response = await api.post("/connection_requests", {
        username: username,
      });
    } catch (error) {
      console.error("Error sending connection request:", error);
      // Optionally, handle error
    }
  };
  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    if (!image) {
      console.error("No image selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user[profile_picture]", image);

      const response = await api.put(`/update_user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleMessage(response);
      handleProfileUpdate();
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await api.get("/me");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching updated profile:", error);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-section">
          <div className="profile-header">
            {isCurrentUserProfile && (
              <div className="profile-picture current">
                {profile_picture ? (
                  <img src={profile_picture} alt="Profile" />
                ) : (
                  <img src={profilePicture} alt="Profile" />
                )}
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
            )}
            {!isCurrentUserProfile && (
              <div className="profile-picture">
                {profile_picture ? (
                  <img src={profile_picture} alt="Profile" />
                ) : (
                  <img src={profilePicture} alt="Profile" />
                )}
              </div>
            )}
            {isCurrentUserProfile ? (
              <div className="edit-profile">
                <button onClick={() => setEditProfile(!editProfile)}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="edit-profile">
                <button onClick={handleConnect}>Connect</button>
              </div>
            )}
          </div>
          {editProfile ? (
            <EditProfileForm
              user={user}
              setIsEditing={setEditProfile}
              onProfileUpdate={handleProfileUpdate}
            />
          ) : (
            <ProfileInfo
              username={username}
              email={email}
              name={name}
              bio={bio}
            />
          )}
        </div>
      </div>
      <div className="profile-skills-container">
        <div className="profile-skills-section">
          {isCurrentUserProfile && (
            <div className="edit-profile">
              <button onClick={() => navigate("/skills")}>Edit Skills</button>
            </div>
          )}
          <h2>Learning skills</h2>
          <div className="skills">{displaySkills(learning_skill_ids)}</div>
          <div className="br" />
          <h2>Expert skills</h2>
          <div className="skills">{displaySkills(expert_skill_ids)}</div>
          <div className="br" />
        </div>
      </div>
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    learning_skill_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    expert_skill_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isCurrentUserProfile: PropTypes.bool.isRequired,
};

export default Profile;
