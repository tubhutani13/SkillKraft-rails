import { useState } from "react";
import api from "../../utils/api";
import useMessage from "../../hooks/useMessage";

function EditProfileForm({ user, setIsEditing, onProfileUpdate }) {
    const { handleMessage } = useMessage();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        name: user.name,
        bio: user.bio,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({})
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await api.put("/update_user", formData);
            console.log(response.data);
            handleMessage(response)
            onProfileUpdate();
            setIsEditing(false);
        } catch (error) {
            console.log(error.response.data.errors);
            setErrors(error.response.data.errors)
        }
    };
    return (
        <form className="edit-profile-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required />
            {errors.username && <div className={`error ${errors ? '' : 'hidden'}`}>{'* Username ' + errors.username}</div>}
            </div>
            <div>
                <label htmlFor="bio">Bio:</label>
                <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    required />
            {errors.bio && <div className={`error ${errors ? '' : 'hidden'}`}>{'* bio ' + errors.bio}</div>}
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required />
            {errors.name && <div className={`error ${errors ? '' : 'hidden'}`}>{'* name ' + errors.name}</div>}
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
}

  export default EditProfileForm;
