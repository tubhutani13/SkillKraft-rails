import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import Profile from '../../components/Profile/Profile';

function UserProfilePage() {
    const [user, setUser] = useState({});
    const [skillsData, setSkillsData] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const [skillsResponse, userResponse] = await Promise.all([
                    api.get('/skills'),
                    api.get(`/users/${username}`)
                ]);
                const user = userResponse.data;
                setSkillsData(skillsResponse.data);
                setUser(user);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [username]);

    return (
        <div className="profile-page">
            <Profile user={user} setUser={setUser} skills={skillsData} isCurrentUserProfile={false} />
        </div>
    );
}

export default UserProfilePage;
