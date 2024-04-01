const ProfileInfo = ({ username, email, bio, name }) => {
    return (<div className="profile-info">
        <div>
            <h2>{username}</h2>
            <p>{bio}</p>
            <p>Email: {email}</p>
            <p>Name: {name}</p>
        </div>
    </div>)
}

export default ProfileInfo;
