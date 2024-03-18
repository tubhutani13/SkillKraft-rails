const ProfileInfo = ({ username, email, name }) => {
    return (<div className="profile-info">
        <div>
            <h2>{username}</h2>
            <p>Email: {email}</p>
            <p>Name: {name}</p>
        </div>
    </div>)
}

export default ProfileInfo;