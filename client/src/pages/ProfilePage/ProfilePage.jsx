import { useEffect, useState} from 'react'
import api from '../../utils/api';
import Profile from '../../components/Profile/Profile';

function ProfilePage() {
    const [user, setUser] = useState({});
    const [skillsData, setSkillsData] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const [skillsResponse, userResponse] = await Promise.all([
                    api.get('/skills'),
                    api.get('/me')
                  ]);
                const user = userResponse.data
                setSkillsData(skillsResponse.data)
                setUser(user);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);
    return (
        <div className="profile-page">
            <Profile user={user} setUser={setUser} skills={skillsData} />
        </div>
    );
}

export default ProfilePage;