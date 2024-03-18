import React, { useEffect, useState } from 'react';
import SkillsForm from '../../components/SkillsForm/SkillsForm';
import api from '../../utils/api';
import useMessage from '../../hooks/useMessage';
import './Skills.scss';

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [learningSkills, setLearningSkills] = useState([]);
  const [expertSkills, setExpertSkills] = useState([]);
  const { handleError } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsResponse, userSkillsResponse] = await Promise.all([
          api.get('/skills'),
          api.get('/users/skills')
        ]);

        setSkillsData(skillsResponse.data);
        setLearningSkills(userSkillsResponse.data?.learning_skills || []);
        setExpertSkills(userSkillsResponse.data?.expert_skills || []);
      } catch (error) {
        handleError(error);
      }
    };

    fetchData();
  }, []);

  const handleSaveSkills = async () => {
    const requestPayload = {
      user: {
        expert_skill_ids: expertSkills,
        learning_skill_ids: learningSkills,
      }
    };

    try {
      const response = await api.put('/update_user', requestPayload);
      console.log(response.data);
      setLearningSkills([]);
      setExpertSkills([]);
    } catch (error) {
      handleError(error);
      console.error("Error updating user skills:", error);
    }

    console.log('Learning Skills:', learningSkills);
    console.log('Expert Skills:', expertSkills);
  };

  return (
    <div className="skills-container">
      <div className="skills-section">
        <h2>Skills You Want to Learn</h2>
        <SkillsForm
          skills={skillsData}
          onChange={(skill) => setLearningSkills([...learningSkills, skill.id])}
          onRemove={(skill) => setLearningSkills(learningSkills.filter((id) => id !== skill.id))}
          selectedSkills={learningSkills} />
      </div>
      <div className="skills-section">
        <h2>Skills You Are Expert In</h2>
        <SkillsForm
          skills={skillsData}
          onChange={(skill) => setExpertSkills([...expertSkills, skill.id])}
          onRemove={(skill) => setExpertSkills(expertSkills.filter((id) => id !== skill.id))}
          selectedSkills={expertSkills} />
      </div>
      <div className="button">
        <button className="save-button" onClick={handleSaveSkills}>Save Skills</button>
      </div>
    </div>
  );
};

export default Skills;
